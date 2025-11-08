import { Box, Stack, Typography } from "@/Components/v3/ui";
import ConfigBox from "@/Components/v1/ConfigBox/index.jsx";
import Select from "@/Components/v1/Inputs/Select/index.jsx";

// Utils
import { PropTypes } from "prop-types";
import { useTranslation } from "react-i18next";

const SettingsUI = ({ HEADING_SX, handleChange, mode, language }) => {
	const { t, i18n } = useTranslation();
	const languages = Object.keys(i18n.options.resources || {});
	return (
		<ConfigBox>
			<Box>
				<Typography
					component="h1"
					variant="h2"
				>
					{t("settingsPage.uiSettings.title")}
				</Typography>
				<Typography sx={HEADING_SX}>
					{t("settingsPage.uiSettings.description")}
				</Typography>
			</Box>
			<Stack gap="80px">
				<Select
					name="mode"
					label={t("settingsPage.uiSettings.labelTheme")}
					value={mode}
					onChange={handleChange}
					items={[
						{ _id: "light", name: "Light" },
						{ _id: "dark", name: "Dark" },
					]}
				></Select>
				<Select
					name="language"
					label={t("settingsPage.uiSettings.labelLanguage")}
					value={language}
					onChange={handleChange}
					items={languages.map((lang) => ({ _id: lang, name: lang.toUpperCase() }))}
				></Select>
			</Stack>
		</ConfigBox>
	);
};

SettingsUI.propTypes = {
	HEADING_SX: PropTypes.object,
	handleChange: PropTypes.func,
	mode: PropTypes.string,
	language: PropTypes.string,
};

export default SettingsUI;
