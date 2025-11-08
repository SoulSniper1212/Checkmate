// Components
import { Stack, Typography } from "@/Components/v3/ui";
import PulseDot from "../Animated/PulseDot.jsx";
import Dot from "../Dot/index.jsx";
// Utils
import { formatDurationRounded } from "../../../Utils/timeUtils.js";
import PropTypes from "prop-types";
import { useMonitorUtils } from "../../../Hooks/v1/useMonitorUtils.js";
import { formatMonitorUrl } from "../../../Utils/utils.js";
/**
 * Status component displays the status information of a monitor.
 * It includes the monitor's name, URL, and check interval.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.monitor - The monitor object containing details
 * @param {string} props.monitor.name - The name of the monitor
 * @param {string} props.monitor.url - The URL of the monitor
 * @param {number} props.monitor.interval - The interval at which the monitor checks
 * @returns {JSX.Element} The rendered component
 */
const Status = ({ monitor }) => {
	const { statusColor, determineState } = useMonitorUtils();

	return (
		<Stack>
			<Typography variant="monitorName">{monitor?.name}</Typography>
			<Stack
				className="flex-row items-center gap-4"
			>
				<PulseDot color={statusColor[determineState(monitor)]} />
				<Typography variant="monitorUrl">{formatMonitorUrl(monitor?.url)}</Typography>
				<Dot />
				<Typography>
					Checking every {formatDurationRounded(monitor?.interval)}.
				</Typography>
			</Stack>
		</Stack>
	);
};

Status.propTypes = {
	monitor: PropTypes.object,
};

export default Status;
