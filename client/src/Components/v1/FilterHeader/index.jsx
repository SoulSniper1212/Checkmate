import { Checkbox, Button } from "@/Components/v3/ui";
import PropTypes from "prop-types";
import { useState } from "react";

/**
 * A reusable filter header component that displays a dropdown menu with selectable options.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.header - The header text to display when no options are selected.
 * @param {Array} props.options - An array of options to display in the dropdown menu. Each option should have a `value` and `label`.
 * @param {Array} [props.value] - The currently selected values.
 * @param {Function} props.onChange - The callback function to handle changes in the selected values.
 * @param {boolean} [props.multiple=true] - Whether multiple options can be selected.
 * @returns {JSX.Element} The rendered FilterHeader component.
 */

// Custom Dropdown Arrow Icon
const DropdownArrowIcon = (props) => (
	<svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
		<path d="M7 10l5 5 5-5z"/>
	</svg>
);

const FilterHeader = ({ header, options, value, onChange, multiple = true }) => {
	const [isOpen, setIsOpen] = useState(false);
	const controlledValue = value === undefined ? [] : value;

	const handleToggle = () => setIsOpen(!isOpen);

	const handleOptionClick = (optionValue) => {
		if (multiple) {
			const newValue = controlledValue.includes(optionValue)
				? controlledValue.filter(v => v !== optionValue)
				: [...controlledValue, optionValue];
			onChange({ target: { value: newValue } });
		} else {
			onChange({ target: { value: optionValue } });
			setIsOpen(false);
		}
	};

	const handleClear = () => {
		onChange({ target: { value: [] } });
	};

	const displayValue = controlledValue.length > 0
		? header + " | " + controlledValue
			.map((val) => options.find((option) => option.value === val)?.label)
			.filter(Boolean)
			.join(", ")
		: header;

	return (
		<div className="relative min-w-[10%]">
			<Button
				onClick={handleToggle}
				variant="outline"
				className="w-full justify-between text-left bg-white border border-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
				size="sm"
			>
				<span className="truncate">{displayValue}</span>
				<DropdownArrowIcon
					className={`ml-2 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
				/>
			</Button>

			{isOpen && (
				<div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
					<div className="p-2">
						{options.map((option) => (
							<div
								key={option.value}
								className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
								onClick={() => handleOptionClick(option.value)}
							>
								<Checkbox
									checked={controlledValue.includes(option.value)}
									readOnly
									className="mr-3"
								/>
								<span className="text-sm font-medium">{option.label}</span>
							</div>
						))}
					</div>
					{controlledValue.length > 0 && (
						<div className="border-t border-gray-200 p-2">
							<button
								onClick={handleClear}
								className="text-xs text-blue-600 hover:text-blue-800"
							>
								Clear all
							</button>
						</div>
					)}
				</div>
			)}

			{/* Click outside to close */}
			{isOpen && (
				<div
					className="fixed inset-0 z-40"
					onClick={() => setIsOpen(false)}
				/>
			)}
		</div>
	);
};

FilterHeader.propTypes = {
	header: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		})
	).isRequired,
	value: PropTypes.arrayOf(PropTypes.string),
	onChange: PropTypes.func.isRequired,
	multiple: PropTypes.bool,
};

export default FilterHeader;
