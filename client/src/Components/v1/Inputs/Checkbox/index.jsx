import PropTypes from "prop-types";
import { Checkbox as ShadcnCheckbox } from "@/Components/v3/ui/checkbox";
import { Label } from "@/Components/v3/ui/label";
import CheckboxOutline from "../../../../assets/icons/checkbox-outline.svg?react";
import CheckboxFilled from "../../../../assets/icons/checkbox-filled.svg?react";

/**
 * Checkbox Component
 *
 * A customized checkbox component using Material-UI that supports custom sizing,
 * disabled states, and custom icons.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {string} props.id - Unique identifier for the checkbox input
 * @param {string} [props.name] - Optional name attribute for the checkbox
 * @param {(string|React.ReactNode)} props.label - Label text or node for the checkbox
 * @param {('small'|'medium'|'large')} [props.size='medium'] - Size of the checkbox icon
 * @param {boolean} props.isChecked - Current checked state of the checkbox
 * @param {string} [props.value] - Optional value associated with the checkbox
 * @param {Function} [props.onChange] - Callback function triggered when checkbox state changes
 * @param {boolean} [props.isDisabled] - Determines if the checkbox is disabled
 *
 * @returns {React.ReactElement} Rendered Checkbox component
 *
 * @example
 * // Basic usage
 * <Checkbox
 *   id="terms-checkbox"
 *   label="I agree to terms"
 *   isChecked={agreed}
 *   onChange={handleAgree}
 * />
 *
 * @example
 * // With custom size and disabled state
 * <Checkbox
 *   id="advanced-checkbox"
 *   label="Advanced Option"
 *   size="large"
 *   isChecked={isAdvanced}
 *   isDisabled={!canModify}
 *   onChange={handleAdvancedToggle}
 * />
 */
const Checkbox = ({
	id,
	name,
	label,
	size = "medium",
	isChecked,
	value,
	onChange,
	isDisabled,
}) => {
	/* TODO move sizes to theme */
	const sizes = { small: "14px", medium: "16px", large: "18px" };
	return (
		<div className="checkbox-wrapper flex items-center space-x-2 p-2.5 rounded-md hover:bg-accent/50 transition-colors">
			<ShadcnCheckbox
				id={id}
				checked={isDisabled ? false : isChecked}
				onCheckedChange={onChange}
				disabled={isDisabled}
				className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
				style={{
					width: sizes[size],
					height: sizes[size]
				}}
			/>
			<Label
				htmlFor={id}
				className={`text-sm cursor-pointer ${
					isDisabled
						? "text-muted-foreground opacity-25"
						: "text-muted-foreground"
				}`}
			>
				{label}
			</Label>
		</div>
	);
};

Checkbox.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
	size: PropTypes.oneOf(["small", "medium", "large"]),
	isChecked: PropTypes.bool.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	onChange: PropTypes.func,
	isDisabled: PropTypes.bool,
};

export default Checkbox;
