import PropTypes from "prop-types";
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import { Box, Button, IconButton, Stack, Typography } from "@/Components/v3/ui";
import "./index.css";

/**
 * Icons mapping for different alert variants.
 * @type {Object<string, JSX.Element>}
 */

// Simple SVG icons to replace MUI icons
const InfoOutlinedIcon = () => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
		<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
	</svg>
);

const ErrorOutlineOutlinedIcon = () => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
		<path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
	</svg>
);

const WarningAmberOutlinedIcon = () => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
		<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
	</svg>
);

const CloseIcon = () => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
		<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
	</svg>
);

const icons = {
	info: <InfoOutlinedIcon />,
	error: <ErrorOutlineOutlinedIcon />,
	warning: <WarningAmberOutlinedIcon />,
};

/**
 * @param {Object} props
 * @param {'info' | 'error' | 'warning'} props.variant - The type of alert.
 * @param {string} [props.title] - The title of the alert.
 * @param {string} [props.body] - The body text of the alert.
 * @param {boolean} [props.isToast] - Indicates if the alert is used as a toast notification.
 * @param {boolean} [props.hasIcon] - Whether to display an icon in the alert.
 * @param {function} props.onClick - Toast dismiss function.
 * @returns {JSX.Element}
 */

const Alert = ({ variant, title, body, isToast, hasIcon = true, onClick }) => {
	const theme = useTheme();
	/* TODO 
	Do we need other variants for alert?
	*/

	const text = theme.palette.secondary.contrastText;
	const border = theme.palette.alert.contrastText;
	const bg = theme.palette.alert.main;
	const icon = icons[variant];

	return (
		<Stack
			direction="row"
			justifyContent="flex-start"
			alignItems={hasIcon ? "" : "center"}
			className="alert row-stack"
			gap={theme.spacing(8)}
			sx={{
				padding: hasIcon ? theme.spacing(8) : `${theme.spacing(4)} ${theme.spacing(8)}`,
				backgroundColor: bg,
				border: `solid 1px ${border}`,
				borderRadius: theme.shape.borderRadius,
			}}
		>
			{hasIcon && <Box sx={{ color: text }}>{icon}</Box>}
			<Stack
				direction="column"
				gap="2px"
				sx={{ flex: 1 }}
			>
				{title && (
					<Typography sx={{ fontWeight: "700", color: `${text}` }}>{title}</Typography>
				)}
				{body && (
					<Typography sx={{ fontWeight: "400", color: `${text}` }}>{body}</Typography>
				)}
				{hasIcon && isToast && (
					<Button
						variant="text"
						color="info"
						onClick={onClick}
						sx={{
							fontWeight: "600",
							width: "fit-content",
							mt: theme.spacing(4),
							padding: 0,
							minWidth: 0,
						}}
					>
						Dismiss
					</Button>
				)}
			</Stack>
			{isToast && (
				<IconButton
					onClick={onClick}
					sx={{
						alignSelf: "flex-start",
						ml: "auto",
						mr: "-5px",
						mt: hasIcon ? "-5px" : 0,
						padding: "5px",
						"&:focus": {
							outline: "none",
						},
					}}
				>
					<CloseIcon
						sx={{
							fontSize: "20px",
						}}
					/>
				</IconButton>
			)}
		</Stack>
	);
};

Alert.propTypes = {
	variant: PropTypes.oneOf(["info", "error", "warning"]).isRequired,
	title: PropTypes.string,
	body: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	isToast: PropTypes.bool,
	hasIcon: PropTypes.bool,
	onClick: function (props, propName, componentName) {
		if (props.isToast && !props[propName]) {
			return new Error(
				`Prop '${propName}' is required when 'isToast' is true in '${componentName}'.`
			);
		}
		return null;
	},
};

export default Alert;
