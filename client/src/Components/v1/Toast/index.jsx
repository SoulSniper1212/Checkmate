import { Stack, IconButton, Typography, Button } from "@/Components/v3/ui";
import { Info, AlertCircle, AlertTriangle, X } from "lucide-react";
import ToastBody from "./body.jsx";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

const icons = {
	info: <Info className="h-5 w-5" />,
	error: <AlertCircle className="h-5 w-5" />,
	warning: <AlertTriangle className="h-5 w-5" />,
};

const variantStyles = {
	info: "bg-blue-50 border-blue-200 text-blue-800",
	error: "bg-red-50 border-red-200 text-red-800",
	warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
};

const Toast = ({ variant, title, body, onClick, hasDismiss, hasIcon, className }) => {
	const icon = icons[variant];

	return (
		<Stack
			className={cn(
				"gap-2 p-4 border rounded-lg",
				variantStyles[variant] || variantStyles.info,
				className
			)}
		>
			<Stack
				direction="row"
				gap="4"
				justifyContent="space-between"
				alignItems="center"
			>
				{hasIcon && icon}
				{title && (
					<Typography
						className="font-semibold"
					>
						{title}
					</Typography>
				)}
				{title && (
					<IconButton
						variant="ghost"
						size="sm"
						onClick={onClick}
						className="h-6 w-6"
					>
						<X className="h-4 w-4" />
					</IconButton>
				)}
			</Stack>

			<Stack
				direction="row"
				gap="2"
				alignItems="center"
			>
				<ToastBody body={body} />
				{!title && (
					<IconButton
						variant="ghost"
						size="sm"
						onClick={onClick}
						className="h-6 w-6"
					>
						<X className="h-4 w-4" />
					</IconButton>
				)}
			</Stack>
			{hasDismiss && (
				<Button
					variant="ghost"
					onClick={onClick}
					className="font-semibold w-fit justify-start p-0 h-auto"
				>
					Dismiss
				</Button>
			)}
		</Stack>
	);
};

export default Toast;

Toast.propTypes = {
	variant: PropTypes.string.isRequired,
	title: PropTypes.string,
	body: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	hasDismiss: PropTypes.bool,
	hasIcon: PropTypes.bool,
	onClick: PropTypes.func,
};
