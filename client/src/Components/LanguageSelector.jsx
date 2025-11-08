import { useTranslation } from "react-i18next";
import { Box, MenuItem, Select, Stack } from "@/Components/v3/ui";
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import "flag-icons/css/flag-icons.min.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLanguage } from "../Features/UI/uiSlice";

const langMap = {
	cs: "cz",
	ja: "jp",
	uk: "ua",
	vi: "vn",
};

const LanguageSelector = () => {
	const { i18n } = useTranslation();
	const theme = useTheme();
	const { language } = useSelector((state) => state.ui);
	const dispatch = useDispatch();
	const handleChange = (event) => {
		const newLang = event.target.value;
		dispatch(setLanguage(newLang));
	};

	const languages = Object.keys(i18n.options.resources || {});

	return (
		<Select
			value={language}
			onChange={handleChange}
			size="small"
			sx={{
				minWidth: 80,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			{languages.map((lang) => {
				let parsedLang = lang === "en" ? "gb" : lang;

				if (parsedLang.includes("-")) {
					parsedLang = parsedLang.split("-")[1].toLowerCase();
				}

				parsedLang = langMap[parsedLang] || parsedLang;

				const flag = parsedLang ? `fi fi-${parsedLang}` : null;

				return (
					<MenuItem
						key={lang}
						value={lang}
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							padding: "4px 8px",
						}}
					>
						<span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
							{flag && <span className={flag} style={{ marginRight: "4px" }} />}
							<span style={{ textTransform: "uppercase" }}>
								{lang}
							</span>
						</span>
					</MenuItem>
				);
			})}
		</Select>
	);
};

export default LanguageSelector;
