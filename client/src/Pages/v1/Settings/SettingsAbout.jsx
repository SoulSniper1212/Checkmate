import { Box, Typography } from "@/Components/v3/ui";
import ConfigBox from "@/Components/v1/ConfigBox/index.jsx";
// Utils
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import { useTranslation } from "react-i18next";
import Link from "@/Components/v1/Link/index.jsx";

const SettingsAbout = () => {
	const theme = useTheme();
	const { t } = useTranslation();
	return (
		<ConfigBox>
			<Box>
				<Typography
					component="h1"
					variant="h2"
				>
					{t("settingsPage.aboutSettings.title")}
				</Typography>
			</Box>
			<Box>
				<Typography component="h2">
					{t("common.appName")} {__APP_VERSION__}
				</Typography>
				<Typography className="mt-[var(--spacing-2)] mb-[var(--spacing-6)] opacity-60">
					{t("settingsPage.aboutSettings.labelDevelopedBy")}
				</Typography>
				<Link
					level="secondary"
					url="https://github.com/bluewave-labs/checkmate"
					label="https://github.com/bluewave-labs/checkmate"
				/>
			</Box>
		</ConfigBox>
	);
};

export default SettingsAbout;
