import { Stack } from "@/Components/v3/ui";
import Logo from "@/assets/icons/checkmate-icon.svg?react";

import { useTranslation } from "react-i18next";
import { LanguageSelector, ThemeSwitch } from "@/Components/v2/Inputs";

export const HeaderAuth = () => {
	const { t } = useTranslation();
	return (
		<Stack
			className="w-full flex-row items-end justify-end py-4 px-12 gap-4"
		>
			<LanguageSelector />
			<ThemeSwitch color="red" />
		</Stack>
	);
};
