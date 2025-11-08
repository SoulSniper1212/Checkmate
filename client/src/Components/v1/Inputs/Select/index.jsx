import PropTypes from "prop-types";
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/Components/v3/ui/select";
import { ChevronDown } from "lucide-react";
import FieldWrapper from "../FieldWrapper/index.jsx";

import "./index.css";

/**
 * @component
 * @param {object} props
 * @param {string} props.id - The ID attribute for the select element.
 * @param {string} props.placeholder - The label of the select element.
 * @param {string} props.placeholder - The placeholder text when no option is selected.
 * @param {boolean} props.isHidden - Whether the placeholder should be hidden.
 * @param {(string | number | boolean)} props.value - The currently selected value.
 * @param {object[]} props.items - The array of items to populate in the select dropdown.
 *    @param {(string | number | boolean)} props.items._id - The unique identifier of each item.
 *    @param {string} props.items.name - The display name of each item.
 * @param {function} props.onChange - The function to handle onChange event.
 * @param {object} props.sx - The custom styles object for MUI Select component.
 * @param {number} props.maxWidth - Maximum width in pixels for the select component. Enables responsive text truncation.
 * @returns {JSX.Element}
 *
 * @example
 * const frequencies = [
 * { _id: 1, name: "1 minute" },
 * { _id: 2, name: "2 minutes" },
 * { _id: 3, name: "3 minutes" },
 * ];
 *
 * <Select
 *  id="frequency-id"
 *  name="my-name"
 *  label="Check frequency"
 *  placeholder="Select frequency"
 *  value={value}
 *  onChange={handleChange}
 *  items={frequencies}
 * />
 */

const Select = ({
	id,
	label,
	placeholder,
	isHidden,
	value,
	items,
	onChange,
	onBlur,
	sx,
	error = false,
	name = "",
	labelControlSpacing = 6,
	maxWidth,
	//FieldWrapper's props
	labelMb,
	labelFontWeight,
	labelVariant,
	labelSx = {},
	fieldWrapperSx = {},
}) => {
	const theme = useTheme();
	const itemStyles = {
		fontSize: "var(--env-var-font-size-medium)",
		color: "var(--muted-foreground)",
		borderRadius: "var(--radius)",
		margin: "0.5rem",
	};

	return (
		<FieldWrapper
			label={label}
			labelMb={labelMb}
			labelVariant={labelVariant}
			labelFontWeight={labelFontWeight}
			labelSx={labelSx}
			gap={labelControlSpacing}
			sx={{
				...fieldWrapperSx,
			}}
		>
			<ShadcnSelect
				value={value}
				onValueChange={onChange}
				name={name}
				disabled={error}
			>
				<SelectTrigger
					className="select-component"
					style={{
						fontSize: "13px",
						minWidth: "125px",
						maxWidth: maxWidth ? `${maxWidth}px` : undefined,
						...sx,
					}}
				>
					<SelectValue placeholder={placeholder} />
					<ChevronDown className="h-4 w-4 opacity-50" />
				</SelectTrigger>
				<SelectContent>
					{placeholder && !isHidden && (
						<SelectItem value="0" className="select-placeholder">
							{placeholder}
						</SelectItem>
					)}
					{items.map((item) => (
						<SelectItem
							value={String(item._id)}
							key={`${id}-${item._id}`}
						>
							{item.name}
						</SelectItem>
					))}
				</SelectContent>
			</ShadcnSelect>
		</FieldWrapper>
	);
};

Select.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	isHidden: PropTypes.bool,
	error: PropTypes.bool,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
		.isRequired,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
				.isRequired,

			name: PropTypes.string.isRequired,
		})
	).isRequired,
	onChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func,
	sx: PropTypes.object,
	labelControlSpacing: PropTypes.number,
	/**
	 * Maximum width in pixels. Used to control text truncation and element width.
	 * Responsive breakpoints will be calculated as percentages of this value.
	 */
	maxWidth: PropTypes.number,
};

export default Select;
