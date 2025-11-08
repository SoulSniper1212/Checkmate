import { Stack } from "@/Components/v3/ui";
import { IconButton } from "@/Components/v3/ui/icon-button";
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import PropTypes from "prop-types";
import { Eye, EyeOff, GripVertical } from "lucide-react";
import DeleteIcon from "../../../../../assets/icons/trash-bin.svg?react";

export const HttpAdornment = ({ https }) => {
	const theme = useTheme();
	return (
		<div
			className="flex items-center h-full border-r pr-2"
			style={{
				borderColor: theme.palette?.primary?.lowContrast || "#e5e7eb",
				backgroundColor: theme.palette?.tertiary?.main || "#f9fafb",
				paddingLeft: theme.spacing ? theme.spacing(6) : "24px",
			}}
		>
			<h5
				className="text-sm"
				style={{
					color: theme.palette?.primary?.contrastTextSecondary || "#6b7280",
					lineHeight: 1,
					opacity: 0.8,
					paddingRight: "var(--env-var-spacing-1-minus)",
				}}
			>
				{https ? "https" : "http"}
			</h5>
		</div>
	);
};

HttpAdornment.propTypes = {
	https: PropTypes.bool.isRequired,
	prefix: PropTypes.string,
};

export const PasswordEndAdornment = ({ fieldType, setFieldType }) => {
	const theme = useTheme();
	return (
		<div className="absolute right-2 top-1/2 transform -translate-y-1/2">
			<IconButton
				aria-label="toggle password visibility"
				onClick={() => setFieldType(fieldType === "password" ? "text" : "password")}
				variant="ghost"
				size="sm"
				className="h-8 w-8"
				style={{
					color: theme.palette?.primary?.lowContrast || "#6b7280",
				}}
			>
				{fieldType === "password" ? (
					<EyeOff className="h-4 w-4" />
				) : (
					<Eye className="h-4 w-4" />
				)}
			</IconButton>
		</div>
	);
};

PasswordEndAdornment.propTypes = {
	fieldType: PropTypes.string,
	setFieldType: PropTypes.func,
};
