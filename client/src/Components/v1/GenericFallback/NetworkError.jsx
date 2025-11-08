import { Typography } from "@/Components/v3/ui";
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import { useTranslation } from "react-i18next";

const NetworkError = () => {
	const theme = useTheme();
	const { t } = useTranslation();

	return (
		<>
			<Typography
				variant="h1"
				marginY={theme.spacing(4)}
				color={theme.palette.primary.contrastTextTertiary}
			>
				{t("common.toasts.networkError")}
			</Typography>
			<Typography>{t("common.toasts.checkConnection")}</Typography>
		</>
	);
};

export default NetworkError;
