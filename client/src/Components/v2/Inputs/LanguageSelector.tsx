import "flag-icons/css/flag-icons.min.css";
import { Select, MenuItem } from "@/Components/v3/ui";

import { useTranslation } from "react-i18next";
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setLanguage } from "@/Features/UI/uiSlice";

export const LanguageSelector = () => {
	const { i18n } = useTranslation();
	const theme = useTheme();
	const dispatch = useDispatch();
	const language = useSelector((state: any) => state.ui.language);
	const languages = Object.keys(i18n.options.resources || {});
	const languageMap: Record<string, string> = {
		cs: "cz",
		ja: "jp",
		uk: "ua",
		vi: "vn",
	};

	const handleChange = (value: string) => {
		dispatch(setLanguage(value));
	};

	const languagesForDisplay = languages.map((l) => {
		let formattedLanguage = l === "en" ? "gb" : l;
		formattedLanguage = formattedLanguage.includes("-")
			? formattedLanguage.split("-")[1].toLowerCase()
			: formattedLanguage;
		formattedLanguage = languageMap[formattedLanguage] || formattedLanguage;
		const flag = formattedLanguage ? `fi fi-${formattedLanguage}` : null;

		return (
			<MenuItem key={l} value={l}>
				<div
					className="flex flex-row"
					style={{ gap: theme.spacing(4) }}
				>
					{flag && <span className={flag} />}
					<span style={{ textTransform: "uppercase" }}>{l}</span>
				</div>
			</MenuItem>
		);
	});

	return (
		<Select
			value={language}
			onChange={handleChange}
		>
			{languagesForDisplay}
		</Select>
	);
};
