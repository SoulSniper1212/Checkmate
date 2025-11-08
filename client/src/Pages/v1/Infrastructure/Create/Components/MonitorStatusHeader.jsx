import { Box, Stack, Tooltip, Typography } from "@/Components/v3/ui";
import { useMonitorUtils } from "../../../../../Hooks/v1/useMonitorUtils.js";
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import { useTranslation } from "react-i18next";
import PulseDot from "@/Components/v1/Animated/PulseDot.jsx";
import PropTypes from "prop-types";
const MonitorStatusHeader = ({ monitor, infrastructureMonitor }) => {
	const theme = useTheme();
	const { t } = useTranslation();
	const { statusColor, pagespeedStatusMsg, determineState } = useMonitorUtils();
	return (
		<Stack
			className="flex-row items-center h-fit gap-[var(--spacing-2)]"
		>
			<Tooltip
				title={pagespeedStatusMsg[determineState(monitor)]}
				disableInteractive
				slotProps={{
					popper: {
						modifiers: [
							{
								name: "offset",
								options: { offset: [0, -8] },
							},
						],
					},
				}}
			>
				<Box>
					<PulseDot color={statusColor[determineState(monitor)]} />
				</Box>
			</Tooltip>
			<Typography
				component="h2"
				variant="monitorUrl"
			>
				{infrastructureMonitor.url?.replace(/^https?:\/\//, "") || "..."}
			</Typography>
			<Typography
				className="relative text-sm ml-[var(--spacing-6)] mt-[var(--spacing-1)] [&::before]:absolute [&::before]:content-[''] [&::before]:w-[var(--spacing-2)] [&::before]:h-[var(--spacing-2)] [&::before]:rounded-full [&::before]:bg-primary-contrast-tertiary [&::before]:opacity-80 [&::before]:left-[calc(var(--spacing-5)*-1)] [&::before]:top-1/2 [&::before]:-translate-y-1/2"
			>
				{t("editing")}
			</Typography>
		</Stack>
	);
};

MonitorStatusHeader.propTypes = {
	monitor: PropTypes.object.isRequired,
	infrastructureMonitor: PropTypes.object.isRequired,
};

export default MonitorStatusHeader;
