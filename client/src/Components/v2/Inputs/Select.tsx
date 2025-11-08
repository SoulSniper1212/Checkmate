import { Select, MenuItem, Typography } from "@/Components/v3/ui";
import type { SelectProps } from "@/Components/v3/ui/select";

// Simple down arrow icon to replace MUI icon
const KeyboardArrowDownIcon = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="currentColor"
	>
		<path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
	</svg>
);

export const SelectInput: React.FC<SelectProps> = ({ sx, ...props }) => {
	// Convert MUI sx prop to Tailwind classes where possible
	const selectStyle = sx || {};

	// Apply specific styling from the original MUI component
	const combinedStyle = {
		...selectStyle,
		// Maintain the 34px height from original component
		minHeight: '34px',
		fontSize: '14px', // typographyLevels.base equivalent
	};

	return (
		<Select
			{...props}
			sx={combinedStyle}
			IconComponent={KeyboardArrowDownIcon}
		/>
	);
};

type ItemTypes = string | number;
interface SelectItem {
	_id: ItemTypes;
	name: string;
}
export type CustomSelectProps = SelectProps & {
	items: SelectItem[];
	placeholder?: string;
	isHidden?: boolean;
	hasError?: boolean;
};

export const SelectFromItems: React.FC<CustomSelectProps> = ({
	items,
	placeholder,
	isHidden = false,
	hasError = false,
	...props
}) => {
	return (
		<SelectInput
			error={hasError}
			IconComponent={KeyboardArrowDownIcon}
			displayEmpty
			MenuProps={{ disableScrollLock: true }}
			renderValue={(selected) => {
				if (!selected) {
					return (
						<Typography
							noWrap
							color="text.secondary"
						>
							{placeholder ?? ""}
						</Typography>
					);
				}
				const selectedItem = items.find((item) => item._id === selected);
				const displayName = selectedItem ? selectedItem.name : placeholder;
				return (
					<Typography
						noWrap
						title={displayName}
					>
						{displayName}
					</Typography>
				);
			}}
			{...props}
		>
			{items.map((item) => (
				<MenuItem
					key={item._id}
					value={item._id}
				>
					{item.name}
				</MenuItem>
			))}
		</SelectInput>
	);
};

SelectInput.displayName = "SelectInput";
SelectFromItems.displayName = "SelectFromItems";
