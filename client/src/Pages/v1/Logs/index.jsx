import { Stack } from "@/Components/v3/ui";
import Breadcrumbs from "@/Components/v1/Breadcrumbs/index.jsx";
import { TabContextProvider, TabList, Tab, TabPanel } from "@/Components/v3/ui";
import Queue from "./Queue/index.jsx";
import LogsComponent from "./Logs/index.jsx";
import Diagnostics from "./Diagnostics/index.jsx";

import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const Logs = () => {
	const { t } = useTranslation();
	const theme = useTheme();

	// Local state
	const [value, setValue] = useState("logs");

	// Handlers
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const BREADCRUMBS = [{ name: t("logsPage.title"), path: "/logs" }];
	return (
		<Stack className="gap-[var(--spacing-20)]">
			<Breadcrumbs list={BREADCRUMBS} />
			<TabContextProvider value={value}>
				<TabList
					value={value}
					onChange={handleChange}
					className="sticky top-0 backdrop-blur-lg z-[var(--z-index-app-bar)]"
				>
					<Tab label={t("logsPage.tabs.logs")} value="logs" />
					<Tab label={t("logsPage.tabs.queue")} value="queue" />
					<Tab label={t("logsPage.tabs.diagnostics")} value="diagnostics" />
				</TabList>
				<TabPanel value={value} index="logs">
					<LogsComponent />
				</TabPanel>
				<TabPanel value={value} index="queue">
					<Queue />
				</TabPanel>
				<TabPanel value={value} index="diagnostics">
					<Diagnostics />
				</TabPanel>
			</TabContextProvider>
		</Stack>
	);
};

export default Logs;
