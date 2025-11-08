import { Checkbox } from "@/Components/v3/ui";
import type { CheckboxProps } from "@/Components/v3/ui/checkbox";
import CheckboxOutline from "@/assets/icons/checkbox-outline.svg?react";
import CheckboxFilled from "@/assets/icons/checkbox-filled.svg?react";
type CheckboxInputProps = CheckboxProps & {
	label?: string;
};

export const CheckboxInput: React.FC<CheckboxInputProps> = ({ label, ...props }) => {
	return (
		<Checkbox
			{...props}
			className="hover:bg-transparent"
			style={{
				width: '32px',
				height: '32px',
			}}
		>
			{/* Custom icons would need to be handled via the checkbox component */}
		</Checkbox>
	);
};
