import { Radio } from "@/Components/v3/ui";
import type { RadioProps } from "@/Components/v3/ui/radio";
import RadioChecked from "@/assets/icons/radio-checked.svg?react";
import { FormControlLabel } from "@/Components/v3/ui/form-control-label";
import { Typography } from "@/Components/v3/ui";

interface RadioInputProps extends RadioProps {}

export const RadioInput: React.FC<RadioInputProps> = ({ ...props }) => {
	return (
		<Radio
			{...props}
			className="border border-gray-300"
			style={{
				color: "transparent",
				marginTop: "2px",
				padding: 0,
				fontSize: "16px",
			}}
		>
			<RadioChecked />
		</Radio>
	);
};

export const RadioWithDescription: React.FC<
	RadioInputProps & { label: string; description: string }
> = ({ label, description, ...props }) => {
	return (
		<FormControlLabel
			control={<RadioInput {...props} />}
			label={
				<>
					<Typography component="p">{label}</Typography>
					<Typography
						component="h6"
						className="text-gray-600"
					>
						{description}
					</Typography>
				</>
			}
			className="items-start p-0 m-0 rounded hover:bg-gray-50"
			style={{
				padding: "10px",
				margin: "-10px",
			}}
		/>
	);
};
