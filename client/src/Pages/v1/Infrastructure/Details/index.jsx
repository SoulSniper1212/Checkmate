// Components
import { Stack, Typography } from "@/Components/v3/ui";
import Breadcrumbs from "@/Components/v1/Breadcrumbs/index.jsx";
import MonitorDetailsControlHeader from "@/Components/v1/MonitorDetailsControlHeader/index.jsx";
import MonitorTimeFrameHeader from "@/Components/v1/MonitorTimeFrameHeader/index.jsx";
import StatusBoxes from "./Components/StatusBoxes/index.jsx";
import GaugeBoxes from "./Components/GaugeBoxes/index.jsx";
import AreaChartBoxes from "./Components/AreaChartBoxes/index.jsx";
import GenericFallback from "@/Components/v1/GenericFallback/index.jsx";
import NetworkStats from "./Components/NetworkStats/index.jsx";
import { TabContextProvider, TabList, Tab, TabPanel } from "@/Components/v3/ui";

// Utils
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import { useIsAdmin } from "../../../../Hooks/v1/useIsAdmin.js";
import { useFetchHardwareMonitorById } from "../../../../Hooks/v1/monitorHooks.js";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

// Constants
const BREADCRUMBS = [
	{ name: "infrastructure monitors", path: "/infrastructure" },
	{ name: "details", path: "" },
];
const InfrastructureDetails = () => {
	// Local state
	const [dateRange, setDateRange] = useState("recent");
	const [trigger, setTrigger] = useState(false);
	const [tab, setTab] = useState("details");

	// Utils
	const theme = useTheme();
	const { monitorId } = useParams();
	const { t } = useTranslation();
	const isAdmin = useIsAdmin();

	const [monitor, isLoading, networkError] = useFetchHardwareMonitorById({
		monitorId,
		dateRange,
		updateTrigger: trigger,
	});

	const triggerUpdate = () => {
		setTrigger(!trigger);
	};

	if (networkError === true) {
		return (
			<GenericFallback>
				<Typography
					variant="h1"
					marginY={theme.spacing(4)}
					color={theme.palette.primary.contrastTextTertiary}
				>
					{t("common.toasts.networkError")}
				</Typography>
				<Typography>{t("common.toasts.checkConnection")}</Typography>
			</GenericFallback>
		);
	}

	if (!isLoading && monitor?.stats?.checks?.length === 0) {
		return (
			<Stack gap={theme.spacing(10)}>
				<Breadcrumbs list={BREADCRUMBS} />
				<MonitorDetailsControlHeader
					path={"infrastructure"}
					isLoading={isLoading}
					isAdmin={isAdmin}
					monitor={monitor}
					triggerUpdate={triggerUpdate}
				/>
				<GenericFallback>
					<Typography>{t("distributedUptimeDetailsNoMonitorHistory")}</Typography>
				</GenericFallback>
			</Stack>
		);
	}

	return (
		<Stack gap={theme.spacing(10)}>
			<Breadcrumbs list={BREADCRUMBS} />
			<MonitorDetailsControlHeader
				path={"infrastructure"}
				isLoading={isLoading}
				isAdmin={isAdmin}
				monitor={monitor}
				triggerUpdate={triggerUpdate}
			/>
			<TabContextProvider value={tab}>
				<TabList
					value={tab}
					onChange={(e, v) => setTab(v)}
				>
					<Tab
						label={t("details")}
						value="details"
					/>
					<Tab
						label={t("network")}
						value="network"
					/>
				</TabList>
				<TabPanel value={tab} index="details">
					<>
						<StatusBoxes
							shouldRender={!isLoading}
							monitor={monitor}
						/>
						<GaugeBoxes
							isLoading={isLoading}
							monitor={monitor}
						/>
						<MonitorTimeFrameHeader
							isLoading={isLoading}
							dateRange={dateRange}
							setDateRange={setDateRange}
						/>
						<AreaChartBoxes
							shouldRender={!isLoading}
							monitor={monitor}
							dateRange={dateRange}
						/>
					</>
				</TabPanel>
				<TabPanel value={tab} index="network">
					<NetworkStats
						net={monitor?.stats?.aggregateData?.latestCheck?.net || []}
						isLoading={isLoading}
						checks={monitor?.stats?.checks}
						dateRange={dateRange}
						setDateRange={setDateRange}
					/>
				</TabPanel>
			</TabContextProvider>
		</Stack>
	);
};

export default InfrastructureDetails;
