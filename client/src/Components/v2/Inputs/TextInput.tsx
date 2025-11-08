import { forwardRef } from "react";
import { TextField } from "@/Components/v3/ui/text-field";
import type { TextFieldProps } from "@/Components/v3/ui/text-field";

// Map MUI TextField props to Shadcn TextField while maintaining compatibility
export const TextInput = forwardRef<HTMLInputElement, TextFieldProps>(
	function TextInput({
		variant = "outlined",
		size = "small",
		sx,
		...props
	}, ref) {
		// Convert MUI sx prop to Tailwind classes where possible
		const textFieldStyle = sx || {};

		// Apply specific styling from the original MUI component
		const combinedStyle = {
			...textFieldStyle,
			// Maintain the 34px height and font size from original component
			minHeight: '34px',
			fontSize: '14px', // typographyLevels.base equivalent
		};

		return (
			<TextField
				{...props}
				ref={ref}
				variant={variant}
				size={size}
				sx={combinedStyle}
			/>
		);
	}
);

TextInput.displayName = "TextInput";
