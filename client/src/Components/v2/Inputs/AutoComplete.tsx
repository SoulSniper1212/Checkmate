import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import { TextInput } from "@/Components/v2/Inputs/TextInput";
import { CheckboxInput } from "@/Components/v2/Inputs/Checkbox";
import { ListItem } from "@/Components/v3/ui";
import { Check } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/Components/v3/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/v3/ui/popover";

interface AutoCompleteInputProps {
	options: any[];
	value?: any;
	onChange?: (value: any) => void;
	multiple?: boolean;
	placeholder?: string;
	disabled?: boolean;
	id?: string;
	getOptionLabel?: (option: any) => string;
	getOptionKey?: (option: any) => string | number;
	className?: string;
	style?: React.CSSProperties;
}

export const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({
	options = [],
	value,
	onChange,
	multiple = false,
	placeholder = "Type to search",
	disabled = false,
	id,
	getOptionLabel = (option) => option.name || option.label || option.toString(),
	getOptionKey = (option) => option._id || option.id || option.toString(),
	className,
	style,
	...props
}) => {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const [searchValue, setSearchValue] = React.useState("");

	const selectedOption = multiple ? value || [] : value;

	const handleSelectChange = (selectedOption: any) => {
		if (multiple) {
			const isSelected = Array.isArray(value) && value.some((item) =>
				getOptionKey(item) === getOptionKey(selectedOption)
			);
			const newValue = isSelected
				? value.filter((item) => getOptionKey(item) !== getOptionKey(selectedOption))
				: [...(value || []), selectedOption];
			onChange?.(newValue);
		} else {
			onChange?.(selectedOption);
			setOpen(false);
		}
	};

	const filteredOptions = React.useMemo(() => {
		if (!searchValue.trim()) return options;
		return options.filter((option) =>
			getOptionLabel(option).toLowerCase().includes(searchValue.toLowerCase())
		);
	}, [options, searchValue, getOptionLabel]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<div className="relative">
					<TextInput
						id={id}
						value={multiple ? "" : (value ? getOptionLabel(value) : "")}
						onChange={(e) => setSearchValue(e.target.value)}
						onFocus={() => setOpen(true)}
						placeholder={placeholder}
						disabled={disabled}
						className={className}
						style={style}
					/>
				</div>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0">
				<Command>
					<CommandInput
						placeholder="Search options..."
						value={searchValue}
						onValueChange={setSearchValue}
					/>
					<CommandList>
						<CommandEmpty>No options found.</CommandEmpty>
						<CommandGroup>
							{filteredOptions.map((option) => {
								const selected = multiple
									? Array.isArray(value) && value.some((item) =>
											getOptionKey(item) === getOptionKey(option)
										)
									: value && getOptionKey(value) === getOptionKey(option);

								return (
									<CommandItem
										key={getOptionKey(option)}
										onSelect={() => handleSelectChange(option)}
									>
										{multiple && (
											<div className="mr-2">
												<CheckboxInput checked={selected} />
											</div>
										)}
										<span>{getOptionLabel(option)}</span>
										{!multiple && selected && (
											<Check className="ml-auto h-4 w-4" />
										)}
									</CommandItem>
								);
							})}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
