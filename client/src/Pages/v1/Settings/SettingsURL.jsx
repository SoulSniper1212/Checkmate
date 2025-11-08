import { Box, Stack, Typography } from "@/Components/v3/ui";
import ConfigBox from "@/Components/v1/ConfigBox/index.jsx";
import Select from "@/Components/v1/Inputs/Select/index.jsx";

// Utils
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import { PropTypes } from "prop-types";
import { useTranslation } from "react-i18next";

const SettingsURL = ({ HEADING_SX, handleChange, showURL = false }) => {
	const { t } = useTranslation();
	const theme = useTheme();
	return (
		<ConfigBox>
			<Box>
				<Typography
					component="h1"
					variant="h2"
				>
					{t("settingsPage.urlSettings.title")}
				</Typography>
				<Typography sx={HEADING_SX}>
					{t("settingsPage.urlSettings.description")}
				</Typography>
			</Box>
			<Stack className="gap-[var(--spacing-20)]">
				<Select
					name="showURL"
					label={t("settingsPage.urlSettings.label")}
					value={showURL === true}
					onChange={handleChange}
					items={[
						{ _id: true, name: t("settingsPage.urlSettings.selectEnabled") },
						{ _id: false, name: t("settingsPage.urlSettings.selectDisabled") },
					]}
				></Select>
			</Stack>
		</ConfigBox>
	);
};

SettingsURL.propTypes = {
	HEADING_SX: PropTypes.object,
	handleChange: PropTypes.func,
	showURL: PropTypes.bool,
};

export default SettingsURL;
