import { Box, Typography, Button } from "@/Components/v3/ui";
import ConfigBox from "@/Components/v1/ConfigBox/index.jsx";
// Utils
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import { PropTypes } from "prop-types";
import { useTranslation } from "react-i18next";
import Dialog from "@/Components/v1/Dialog/index.jsx";
import { useState } from "react";

const SettingsDemoMonitors = ({ isAdmin, HEADER_SX, handleChange, isLoading }) => {
	const { t } = useTranslation();
	const theme = useTheme();
	// Local state
	const [isOpen, setIsOpen] = useState(false);

	if (!isAdmin) {
		return null;
	}

	return (
		<>
			<ConfigBox>
				<Box>
					<Typography
						component="h1"
						variant="h2"
					>
						{t("settingsPage.demoMonitorsSettings.title")}
					</Typography>
					<Typography sx={HEADER_SX}>
						{t("settingsPage.demoMonitorsSettings.description")}
					</Typography>
				</Box>
				<Box>
					<Button
						muiVariant="contained"
						color="primary"
						loading={isLoading}
						onClick={() => {
							const syntheticEvent = {
								target: {
									name: "demo",
								},
							};
							handleChange(syntheticEvent);
						}}
						className="mt-[var(--spacing-4)]"
					>
						{t("settingsPage.demoMonitorsSettings.buttonAddMonitors")}
					</Button>
				</Box>
			</ConfigBox>
			<ConfigBox>
				<Box>
					<Typography
						component="h1"
						variant="h2"
					>
						{t("settingsPage.systemResetSettings.title")}
					</Typography>
					<Typography className="mt-[var(--spacing-2)]">
						{t("settingsPage.systemResetSettings.description")}
					</Typography>
				</Box>
				<Box>
					<Button
						muiVariant="contained"
						color="error"
						loading={isLoading}
						onClick={() => setIsOpen(true)}
						className="mt-[var(--spacing-4)]"
					>
						{t("settingsPage.systemResetSettings.buttonRemoveAllMonitors")}
					</Button>
				</Box>
				<Dialog
					open={isOpen}
					theme={theme}
					title={t("settingsPage.systemResetSettings.dialogTitle")}
					onCancel={() => setIsOpen(false)}
					confirmationButtonLabel={t("settingsPage.systemResetSettings.dialogConfirm")}
					onConfirm={() => {
						const syntheticEvent = {
							target: {
								name: "deleteMonitors",
							},
						};
						handleChange(syntheticEvent);
						setIsOpen(false);
					}}
					isLoading={isLoading}
				/>
			</ConfigBox>
		</>
	);
};

SettingsDemoMonitors.propTypes = {
	isAdmin: PropTypes.bool,
	handleChange: PropTypes.func,
	HEADER_SX: PropTypes.object,
};

export default SettingsDemoMonitors;
