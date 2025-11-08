import PropTypes from "prop-types";
import { ListItem } from "@/Components/v3/ui";
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import { Search as SearchIcon, Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FieldWrapper from "../FieldWrapper/index.jsx";
import { Input } from "@/Components/v3/ui/input";
import { Label } from "@/Components/v3/ui/label";
import { Checkbox } from "@/Components/v3/ui/checkbox";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/Components/v3/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/v3/ui/popover";

/**
 * Search component using shadcn/ui components.
 *
 * @param {Object} props
 * @param {string} props.id - Unique identifier for the search component
 * @param {Array<Object>} props.options - Options to display in the search dropdown
 * @param {string} props.filteredBy - Key to access the option label from the options
 * @param {string} props.value - Current input value for the search
 * @param {Function} props.handleChange - Function to call when the input changes
 * @param {Function} Prop.onBlur - Function to call when the input is blured
 * @param {Object} props.sx - Additional styles to apply to the component
 * @param {string} props.unit - Label to identify type of options
 * @returns {JSX.Element} The rendered Search component
 */

//TODO keep search state inside of component.
const Search = ({
	label,
	id,
	options,
	filteredBy,
	secondaryLabel,
	value,
	inputValue,
	handleInputChange,
	handleChange,
	sx,
	multiple = false,
	isAdorned = true,
	error,
	disabled,
	startAdornment,
	endAdornment,
	onBlur,
	//FieldWrapper's props
	gap,
	labelMb,
	labelFontWeight,
	labelVariant,
	labelSx = {},
	unit = "option",
	maxWidth = "100%",
}) => {
	const theme = useTheme();
	const { t } = useTranslation();
	const [selectAll, setSelectAll] = useState(false);
	const [open, setOpen] = useState(false);
	const [searchValue, setSearchValue] = useState(inputValue || "");

	const enhancedOptions = React.useMemo(() => {
		return multiple && isAdorned
			? [
					{ [filteredBy]: t("selectAll"), isSelectAll: true, _id: "select_all" },
					...options,
				]
			: options;
	}, [multiple, isAdorned, options, filteredBy]);

	const isOptionSelected = (option) => {
		if (!multiple && !isAdorned) return false;
		if (Array.isArray(value)) {
			return value.some((item) => item._id === option._id);
		}
		return false;
	};

	const handleSelectAll = (isSelectAll) => {
		const newValue = isSelectAll ? [...options] : [];
		handleChange(newValue);
		setSelectAll(isSelectAll);
	};

	useEffect(() => {
		const allSelected =
			Array.isArray(value) && Array.isArray(options) && value.length === options.length;
		if (selectAll !== allSelected) setSelectAll(allSelected);
	}, [value, options]);

	useEffect(() => {
		setSearchValue(inputValue || "");
	}, [inputValue]);
	const handleSelectChange = (selectedOption) => {
		if (multiple && isAdorned) {
			if (selectedOption.isSelectAll) {
				handleSelectAll(!selectAll);
			} else {
				if (Array.isArray(value)) {
					const isSelected = value.some((item) => item._id === selectedOption._id);
					const newValue = isSelected
						? value.filter((item) => item._id !== selectedOption._id)
						: [...value, selectedOption];
					handleChange(newValue);
					setSelectAll(newValue.length === options.length);
				} else {
					handleChange([selectedOption]);
				}
			}
		} else {
			handleChange(selectedOption);
			setOpen(false);
		}
	};

	const handleSearchInputChange = (newInputValue) => {
		setSearchValue(newInputValue);
		handleInputChange(newInputValue);
	};

	const filteredOptions = React.useMemo(() => {
		if (searchValue.trim() === "" && multiple && isAdorned) {
			return enhancedOptions;
		}
		const filtered = enhancedOptions.filter((option) =>
			option[filteredBy].toLowerCase().includes(searchValue.toLowerCase())
		);

		if (filtered.length === 0) {
			return [
				{
					[filteredBy]: t("general.noOptionsFound", { unit: unit }),
					noOptions: true,
				},
			];
		}
		return filtered;
	}, [enhancedOptions, searchValue, filteredBy, multiple, isAdorned, t, unit]);

	return (
		<FieldWrapper
			label={label}
			labelMb={labelMb}
			labelVariant={labelVariant}
			labelFontWeight={labelFontWeight}
			labelSx={labelSx}
			gap={gap}
			sx={{
				...sx,
			}}
		>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<div className="relative">
						<Input
							id={id}
							value={searchValue}
							onChange={(e) => handleSearchInputChange(e.target.value)}
							onFocus={() => setOpen(true)}
							onBlur={onBlur}
							placeholder="Type to search"
							disabled={disabled}
							className={`pr-10 ${isAdorned ? "pl-10" : ""} ${error ? "border-red-500" : ""}`}
							style={{
								...sx,
								maxWidth
							}}
						/>
						{isAdorned && (
							<SearchIcon
								className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500"
							/>
						)}
						{endAdornment && (
							<div className="absolute right-3 top-1/2 transform -translate-y-1/2">
								{endAdornment}
							</div>
						)}
					</div>
				</PopoverTrigger>
				<PopoverContent className="w-full p-0" style={{ maxWidth }}>
					<Command>
						<CommandInput
							placeholder="Search options..."
							value={searchValue}
							onValueChange={handleSearchInputChange}
						/>
						<CommandList>
							<CommandEmpty>No options found.</CommandEmpty>
							<CommandGroup>
								{filteredOptions.map((option) => {
									const selected = isOptionSelected(option);
									const hasSecondaryLabel = secondaryLabel && option[secondaryLabel] !== undefined;
									const port = option["port"];

									return (
										<CommandItem
											key={option._id}
											onSelect={() => !option.noOptions && handleSelectChange(option)}
											className={`
												${option.noOptions ? "pointer-events-none opacity-50" : ""}
												${option.isSelectAll ? "font-bold bg-gray-100" : ""}
											`}
											disabled={option.noOptions}
										>
											{multiple && isAdorned && !option.noOptions && (
												<div className="mr-2">
													<Checkbox
														checked={option.isSelectAll ? selectAll : selected}
													/>
												</div>
											)}
											<span>
												{option[filteredBy]}
												{hasSecondaryLabel && (
													<span className="text-gray-500 ml-1">
														({option[secondaryLabel]}{port ? `: ${port}` : ""})
													</span>
												)}
											</span>
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
			{error && (
				<span
					className="text-red-500 text-sm mt-1 opacity-80"
					style={{
						color: theme.palette?.error?.main || "#ef4444",
						marginTop: theme.spacing ? theme.spacing(2) : "8px"
					}}
				>
					{error}
				</span>
			)}
		</FieldWrapper>
	);
};

Search.propTypes = {
	label: PropTypes.string,
	id: PropTypes.string,
	multiple: PropTypes.bool,
	options: PropTypes.array.isRequired,
	filteredBy: PropTypes.string.isRequired,
	secondaryLabel: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	inputValue: PropTypes.string.isRequired,
	handleInputChange: PropTypes.func.isRequired,
	handleChange: PropTypes.func,
	isAdorned: PropTypes.bool,
	sx: PropTypes.object,
	error: PropTypes.string,
	disabled: PropTypes.bool,
	startAdornment: PropTypes.object,
	endAdornment: PropTypes.object,
	onBlur: PropTypes.func,
	unit: PropTypes.string,
};

export default Search;
