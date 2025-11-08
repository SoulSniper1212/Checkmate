import PropTypes from "prop-types";
import { Stack, Typography } from "@/Components/v3/ui";
import { ColorPicker as BaseColorPicker } from "@/Components/v3/ui/color-picker";

/**
 *
 * @param {*} id The ID of the component
 * @param {*} value The color value of the component
 * @param {*} error The error of the component
 * @param {*} onChange The Change handler function
 * @param {*} onBlur The Blur handler function
 * @returns The ColorPicker component
 * Example usage:
 * 	<ColorPicker
 *		id="color"
 *		value={form.color}
 *		error={errors["color"]}
 *		onChange={handleColorChange}
 *		onBlur={handleBlur}
 *		>
 *	</ColorPicker>
 */
const ColorPicker = ({ id, name, value, error, onChange, onBlur }) => {
	return (
		<Stack gap="16px">
			<BaseColorPicker
				name={name}
				value={value}
				id={id}
				onChange={(color) => onChange({ target: { name, value: color } })}
				onBlur={onBlur}
			/>
			{error && (
				<Typography
					component="span"
					className="input-error text-red-500 mt-2 opacity-80"
				>
					{error}
				</Typography>
			)}
		</Stack>
	);
};

ColorPicker.propTypes = {
	id: PropTypes.string.isRequired,
	value: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func,
	name: PropTypes.string,
};

export default ColorPicker;
