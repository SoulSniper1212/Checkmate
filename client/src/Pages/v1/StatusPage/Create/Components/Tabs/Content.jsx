// Components
import { Stack, Typography } from "@/Components/v3/ui";
import MonitorList from "../MonitorList/index.jsx";

// Simple TabPanel component to replace @mui/lab
const TabPanel = ({ children, value, index }) => {
	return value === index ? <div>{children}</div> : null;
};
import Search from "@/Components/v1/Inputs/Search/index.jsx";
import Checkbox from "@/Components/v1/Inputs/Checkbox/index.jsx";
// Utils
import { useState } from "react";
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import { useTranslation } from "react-i18next";
import ConfigStack from "./ConfigStack.jsx";
const Content = ({
	tabValue,
	form,
	monitors,
	handleFormChange,
	errors,
	selectedMonitors,
	setSelectedMonitors,
}) => {
	// Local state
	const [search, setSearch] = useState("");

	// Handlers
	const handleMonitorsChange = (selectedMonitors) => {
		handleFormChange({
			target: { name: "monitors", value: selectedMonitors.map((monitor) => monitor._id) },
		});
		setSelectedMonitors(selectedMonitors);
	};

	// Utils
	const theme = useTheme();
	const { t } = useTranslation();

	return (
		<TabPanel value={tabValue}>
			<Stack gap="2.5rem">
				<ConfigStack
					title={t("statusPageCreateTabsContent")}
					description={t("statusPageCreateTabsContentDescription")}
				>
					<Stack>
						<Stack
							direction="row"
							justifyContent="space-between"
						>
							<Search
								options={monitors}
								multiple={true}
								filteredBy="name"
								value={selectedMonitors}
								inputValue={search}
								handleInputChange={setSearch}
								handleChange={handleMonitorsChange}
							/>
						</Stack>
						<Typography
							component="span"
							className="input-error /* TODO: Convert sx to Tailwind - opacity: 0.8 */"
						>
							{errors["monitors"]}
						</Typography>
						<MonitorList
							selectedMonitors={selectedMonitors}
							setSelectedMonitors={handleMonitorsChange}
						/>
					</Stack>
				</ConfigStack>
				<ConfigStack
					title={t("features")}
					description={t("statusPageCreateTabsContentFeaturesDescription")}
				>
					<Stack>
						<Checkbox
							id="showCharts"
							name="showCharts"
							label={t("showCharts")}
							isChecked={form.showCharts}
							onChange={handleFormChange}
						/>
						<Checkbox
							id="showUptimePercentage"
							name="showUptimePercentage"
							label={t("showUptimePercentage")}
							isChecked={form.showUptimePercentage}
							onChange={handleFormChange}
						/>
						<Checkbox
							id="showAdminLoginLink"
							name="showAdminLoginLink"
							label={t("showAdminLoginLink")}
							isChecked={form.showAdminLoginLink}
							onChange={handleFormChange}
						/>
					</Stack>
				</ConfigStack>
			</Stack>
		</TabPanel>
	);
};

export default Content;
