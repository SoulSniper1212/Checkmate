import PropTypes from "prop-types";
import { FormControlLabel, Typography } from "@/Components/v3/ui";
import { Radio as MUIRadio } from "@/Components/v3/ui";
import RadioChecked from "../../../../assets/icons/radio-checked.svg?react";
import "./index.css";

/**
 * Radio component.
 *
 * @component
 * @example
 * // Usage:
 * <Radio
 *   title="Radio Button Title"
 *   desc="Radio Button Description"
 *   size="small"
 * />
 *
 * @param {Object} props - The component
 * @param {string} id - The id of the radio button.
 * @param {string} title - The title of the radio button.
 * @param {string} [desc] - The description of the radio button.
 * @param {string} [size="small"] - The size of the radio button.
 * @returns {JSX.Element} - The rendered Radio component.
 */

const Radio = ({
	name,
	checked,
	value,
	id,
	size,
	title,
	desc,
	onChange,
	labelSpacing,
}) => {
	return (
		<FormControlLabel
			className="custom-radio-button"
			name={name}
			checked={checked}
			value={value}
			control={
				<MUIRadio
					id={id}
					size={size}
					checkedIcon={<RadioChecked />}
					className="w-4 h-4 mt-2 border-slate-400 border-2"
					style={{
						color: "transparent",
						boxShadow: "inset 0 0 0 1px #64748b",
					}}
				/>
			}
			onChange={onChange}
			label={
				<>
					<Typography
						component="p"
						mb={labelSpacing !== undefined ? `${labelSpacing * 4}px` : "8px"}
					>
						{title}
					</Typography>
					<Typography
						component="h6"
						mt="4px"
						className="text-slate-400"
					>
						{desc}
					</Typography>
				</>
			}
			labelPlacement="end"
			className="items-start p-0 m-0 rounded-md hover:bg-slate-800 -m-5 p-5"
			style={{
				"& .MuiButtonBase-root": {
					p: 0,
					marginRight: "24px",
				},
			}}
		/>
	);
};

Radio.propTypes = {
	title: PropTypes.string,
	desc: PropTypes.string,
	size: PropTypes.string,
	name: PropTypes.string,
	checked: PropTypes.bool,
	value: PropTypes.string,
	id: PropTypes.string,
	onChange: PropTypes.func,
};

export default Radio;
