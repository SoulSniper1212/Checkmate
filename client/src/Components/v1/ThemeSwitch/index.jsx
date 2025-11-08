/**
 * ThemeSwitch Component
 * Dark and Light Theme Switch
 * Original Code: https://web.dev/patterns/theming/theme-switch
 * License: Apache License 2.0
 * Copyright © Google LLC
 *
 * This code has been adapted for use in this project.
 * Apache License: https://www.apache.org/licenses/LICENSE-2.0
 */

import { IconButton } from "@/Components/v3/ui";
import SunAndMoonIcon from "./SunAndMoonIcon.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../../../Features/UI/uiSlice.js";
import "./index.css";
import { useTranslation } from "react-i18next";

const ThemeSwitch = ({ width = 48, height = 48, color }) => {
	const mode = useSelector((state) => state.ui.mode);
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const toggleTheme = () => {
		dispatch(setMode(mode === "light" ? "dark" : "light"));
	};

	return (
		<IconButton
			id="theme-toggle"
			title={t("common.buttons.toggleTheme")}
			className={`theme-${mode}`}
			aria-label="auto"
			aria-live="polite"
			onClick={toggleTheme}
			style={{
				width: `${width}px`,
				height: `${height}px`,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<SunAndMoonIcon />
		</IconButton>
	);
};

export default ThemeSwitch;
