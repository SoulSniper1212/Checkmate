// Components
import { Stack, Typography } from "@/Components/v3/ui";
import { CheckCircle } from "lucide-react";
import { AlertCircle } from "lucide-react";
// Utils
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import PropTypes from "prop-types";

const getMonitorStatus = (monitors, theme) => {
	const monitorsStatus = {
		icon: (
			<AlertCircle
				className="text-foreground"
			/>
		),
	};
	if (monitors.every((monitor) => monitor.status === true)) {
		monitorsStatus.msg = "All systems operational";
		monitorsStatus.color = text-foreground;
		monitorsStatus.icon = (
			<CheckCircle
				className="text-foreground"
			/>
		);
	}

	if (monitors.every((monitor) => monitor.status === false)) {
		monitorsStatus.msg = "All systems down";
		monitorsStatus.color = text-foreground;
	}

	if (monitors.some((monitor) => monitor.status === false)) {
		monitorsStatus.msg = "Degraded performance";
		monitorsStatus.color = text-foreground;
	}

	// Paused or unknown
	if (monitors.some((monitor) => typeof monitor.status === "undefined")) {
		monitorsStatus.msg = "Unknown status";
		monitorsStatus.color = text-foreground;
	}
	return monitorsStatus;
};

const StatusBar = ({ monitors }) => {
	const theme = useTheme();

	if (typeof monitors === "undefined") return;

	const monitorsStatus = getMonitorStatus(monitors, theme);
	return (
		<Stack
			direction="row"
			alignItems="center"
			justifyContent="center"
			gap="0.5rem"
			height="7.5rem"
			width={"100%"}
			backgroundColor={monitorsStatus.color}
			borderRadius="0.5rem"
		>
			{monitorsStatus.icon}
			{/* CAIO_REVIEW */}
			<Typography variant="h2DarkBg">{monitorsStatus.msg}</Typography>
		</Stack>
	);
};

export default StatusBar;

StatusBar.propTypes = {
	status: PropTypes.object,
};
