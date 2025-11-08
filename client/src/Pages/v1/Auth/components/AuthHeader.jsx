// Components
import { Stack, Typography } from "@/Components/v3/ui";
import Logo from "../../../../assets/icons/checkmate-icon.svg?react";
import LanguageSelector from "../../../../Components/LanguageSelector.jsx";
import ThemeSwitch from "@/Components/v1/ThemeSwitch/index.jsx";

// Utils
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import { useTranslation } from "react-i18next";

const AuthHeader = ({ hideLogo = false }) => {
	// Hooks
	const theme = useTheme();
	const { t } = useTranslation();

	return (
		<Stack
			className="flex-row items-center justify-between px-[var(--spacing-12)] gap-[var(--spacing-4)]"
		>
			<Stack
				className="flex-row items-center gap-[var(--spacing-4)]"
			>
				{!hideLogo && (
					<>
						<Logo style={{ borderRadius: theme.shape.borderRadius }} />
						<Typography className="select-none">{t("common.appName")}</Typography>
					</>
				)}
			</Stack>
			<Stack
				className="flex-row gap-[var(--spacing-2)] items-center"
			>
				<LanguageSelector />
				<ThemeSwitch />
			</Stack>
		</Stack>
	);
};

export default AuthHeader;
