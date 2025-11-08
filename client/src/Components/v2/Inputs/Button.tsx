import { Button } from "@/Components/v3/ui/button";
import { Box } from "@/Components/v3/ui/box";
import type { ButtonProps } from "@/Components/v3/ui/button";

// Map MUI props to Shadcn props while maintaining compatibility
export const ButtonInput: React.FC<ButtonProps> = ({
	sx,
	variant,
	color,
	size,
	fullWidth,
	startIcon,
	endIcon,
	loading,
	disabled,
	children,
	...props
}) => {
	// Map MUI variant to Shadcn variant
	const getShadcnVariant = (muiVariant: any) => {
		switch (muiVariant) {
			case 'contained':
				return 'default';
			case 'outlined':
				return 'outline';
			case 'text':
				return 'ghost';
			default:
				return 'default';
		}
	};

	// Map MUI color to Shadcn styling
	const getShadcnColor = (muiColor: any) => {
		switch (muiColor) {
			case 'primary':
				return 'bg-blue-600 hover:bg-blue-700';
			case 'secondary':
				return 'bg-gray-600 hover:bg-gray-700';
			case 'error':
				return 'bg-red-600 hover:bg-red-700';
			case 'warning':
				return 'bg-yellow-600 hover:bg-yellow-700';
			case 'info':
				return 'bg-cyan-600 hover:bg-cyan-700';
			case 'success':
				return 'bg-green-600 hover:bg-green-700';
			case 'accent':
				return 'bg-purple-600 hover:bg-purple-700';
			default:
				return 'bg-blue-600 hover:bg-blue-700';
		}
	};

	// Map MUI size to Shadcn size
	const getShadcnSize = (muiSize: any) => {
		switch (muiSize) {
			case 'small':
				return 'sm';
			case 'large':
				return 'lg';
			default:
				return 'default';
		}
	};

	const buttonStyle = sx || {};
	const variantClass = getShadcnVariant(variant);
	const colorClass = color ? getShadcnColor(color) : '';
	const sizeClass = getShadcnSize(size);

	return (
		<Box sx={{ width: fullWidth ? '100%' : 'auto', ...buttonStyle }}>
			<Button
				{...props}
				muiVariant={variant}
				muiSize={size}
				color={color}
				fullWidth={fullWidth}
				startIcon={startIcon}
				endIcon={endIcon}
				loading={loading}
				disabled={disabled}
				variant={variantClass}
				className={`${colorClass} ${fullWidth ? 'w-full' : ''}`}
			>
				{children}
			</Button>
		</Box>
	);
};
