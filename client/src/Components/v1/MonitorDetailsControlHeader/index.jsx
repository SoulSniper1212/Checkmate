import Status from "./status.jsx";
import Skeleton from "./skeleton.jsx";
import { Button } from "@/Components/v3/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/v3/ui/tooltip";
import { Settings, Pause, Play, Mail } from "lucide-react";

// Utils
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import { usePauseMonitor } from "../../../Hooks/v1/monitorHooks.js";
import { useSendTestEmail } from "../../../Hooks/v1/useSendTestEmail.js";
import { useTranslation } from "react-i18next";
import { useTestAllNotifications } from "../../../Hooks/v1/useNotifications.js";
/**
 * MonitorDetailsControlHeader component displays the control header for monitor details.
 * It includes status display, pause/resume button, and a configure button for admins.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.path - The base path for navigation
 * @param {boolean} [props.isLoading=false] - Flag indicating if the data is loading
 * @param {boolean} [props.isAdmin=false] - Flag indicating if the user is an admin
 * @param {Object} props.monitor - The monitor object containing details
 * @param {Function} props.triggerUpdate - Function to trigger an update
 * @returns {JSX.Element} The rendered component
 */
const MonitorDetailsControlHeader = ({
	path,
	isLoading = false,
	isAdmin = false,
	monitor,
	triggerUpdate,
}) => {
	const navigate = useNavigate();
	const theme = useTheme();
	const { t } = useTranslation();
	const [pauseMonitor, isPausing, error] = usePauseMonitor();

	const isTestNotificationsDisabled = monitor?.notifications?.length === 0;

	const tooltipTitle = isTestNotificationsDisabled ? t("testNotificationsDisabled") : "";

	// const [isSending, emailError, sendTestEmail] = useSendTestEmail();

	const [testAllNotifications, isSending, errorAllNotifications] =
		useTestAllNotifications();

	if (isLoading) {
		return <Skeleton />;
	}

	return (
		<TooltipProvider>
			<div className="flex justify-between">
				<Status monitor={monitor} />

				<div className="flex gap-2">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="secondary"
								disabled={isTestNotificationsDisabled || isSending}
								onClick={() => {
									testAllNotifications({ monitorId: monitor?._id });
								}}
								className="whitespace-nowrap"
							>
								<Mail className="mr-2 h-4 w-4" />
								{t("sendTestNotifications")}
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>{tooltipTitle}</p>
						</TooltipContent>
					</Tooltip>
					<Button
						variant="secondary"
						onClick={(e) => {
							navigate(`/incidents/${monitor?._id}`);
						}}
					>
						{t("menu.incidents")}
					</Button>
					{isAdmin && (
						<Button
							variant="secondary"
							disabled={isPausing}
							onClick={() => {
								pauseMonitor({
									monitorId: monitor?._id,
									triggerUpdate,
								});
							}}
						>
							{monitor?.isActive ? (
								<Pause className="mr-2 h-4 w-4" />
							) : (
								<Play className="mr-2 h-4 w-4" />
							)}
							{monitor?.isActive ? "Pause" : "Resume"}
						</Button>
					)}
					{isAdmin && (
						<Button
							variant="secondary"
							onClick={() => navigate(`/${path}/configure/${monitor._id}`)}
						>
							<Settings className="mr-2 h-4 w-4" />
							Configure
						</Button>
					)}
				</div>
			</div>
		</TooltipProvider>
	);
};

MonitorDetailsControlHeader.propTypes = {
	path: PropTypes.string,
	isLoading: PropTypes.bool,
	isAdmin: PropTypes.bool,
	monitor: PropTypes.object,
	triggerUpdate: PropTypes.func,
};

export default MonitorDetailsControlHeader;
