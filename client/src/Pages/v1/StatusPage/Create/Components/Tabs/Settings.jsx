// Components
import { Stack, Typography } from "@/Components/v3/ui";
import ConfigBox from "@/Components/v1/ConfigBox/index.jsx";

// Simple TabPanel component to replace @mui/lab
const TabPanel = ({ children, value, index }) => {
	return value === index ? <div>{children}</div> : null;
};
import Checkbox from "@/Components/v1/Inputs/Checkbox/index.jsx";
import TextInput from "@/Components/v1/Inputs/TextInput/index.jsx";
import Search from "@/Components/v1/Inputs/Search/index.jsx";
import ImageUpload from "@/Components/v1/Inputs/ImageUpload/index.jsx";
import ColorPicker from "@/Components/v1/Inputs/ColorPicker/index.jsx";
import Progress from "../Progress/index.jsx";

// Utils
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import timezones from "../../../../../../Utils/timezones.json";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useMemo, useState, useCallback } from "react";

const TabSettings = ({
	isCreate,
	tabValue,
	form,
	handleFormChange,
	handleImageChange,
	progress,
	removeLogo,
	errors,
}) => {
	// Utils
	const theme = useTheme();
	const { t } = useTranslation();
	const [rawInput, setRawInput] = useState("");

	const selectedTimezone = useMemo(
		() => timezones.find((tz) => tz._id === form.timezone) ?? null,
		[form.timezone]
	);

	const handleTimezoneChange = useCallback(
		(newValue) => {
			setRawInput("");
			handleFormChange({
				target: {
					name: "timezone",
					value: newValue?._id ?? "",
				},
			});
		},
		[handleFormChange]
	);

	return (
		<TabPanel value={tabValue}>
			<Stack gap="2.5rem">
				<ConfigBox>
					<Stack>
						<Typography
							component="h2"
							variant="h2"
						>
							{t("access")}
						</Typography>
						<Typography component="p">{t("statusPageCreateSettings")}</Typography>
					</Stack>
					<Stack gap="4.5rem">
						<Checkbox
							id="publish"
							name="isPublished"
							label={t("statusPageCreateSettingsCheckboxLabel")}
							isChecked={form.isPublished}
							onChange={handleFormChange}
						/>
					</Stack>
				</ConfigBox>
				<ConfigBox>
					<Stack gap="1.5rem">
						<Typography
							component="h2"
							variant="h2"
						>
							{t("basicInformation")}
						</Typography>
						<Typography component="p">
							{t("statusPageCreateBasicInfoDescription")}
						</Typography>
					</Stack>
					<Stack gap="4.5rem">
						<TextInput
							id="companyName"
							name="companyName"
							type="text"
							label={t("companyName")}
							value={form.companyName}
							onChange={handleFormChange}
							helperText={errors["companyName"]}
							error={errors["companyName"] ? true : false}
						/>
						<TextInput
							id="url"
							name="url"
							type="url"
							disabled={!isCreate}
							label={t("statusPageCreateBasicInfoStatusPageAddress")}
							value={form.url}
							onChange={handleFormChange}
							helperText={errors["url"]}
							error={errors["url"] ? true : false}
						/>
					</Stack>
				</ConfigBox>
				<ConfigBox>
					<Stack gap="1.5rem">
						<Typography
							component="h2"
							variant="h2"
						>
							{t("timezone")}
						</Typography>
						<Typography component="p">
							{t("statusPageCreateSelectTimeZoneDescription")}
						</Typography>
					</Stack>
					<Stack gap="1.5rem">
						<Search
							id="timezone"
							label={t("settingsDisplayTimezone")}
							options={timezones}
							filteredBy="name"
							value={selectedTimezone}
							inputValue={rawInput}
							handleInputChange={(newVal) => setRawInput(newVal)}
							handleChange={handleTimezoneChange}
							isAdorned={true}
							unit="timezone"
						/>
					</Stack>
				</ConfigBox>
				<ConfigBox>
					<Stack gap="1.5rem">
						<Typography
							component="h2"
							variant="h2"
						>
							{t("statusPageCreateAppearanceTitle")}
						</Typography>
						<Typography component="p">
							{t("statusPageCreateAppearanceDescription")}
						</Typography>
					</Stack>
					<Stack gap="1.5rem">
						<ImageUpload
							src={form?.logo?.src}
							onChange={handleImageChange}
							previewIsRound={false}
						/>
						<Progress
							isLoading={progress.isLoading}
							progressValue={progress.value}
							logo={form.logo}
							logoType={form.logo?.type}
							removeLogo={removeLogo}
						/>
						<ColorPicker
							id="color"
							name="color"
							value={form.color}
							onChange={handleFormChange}
						/>
					</Stack>
				</ConfigBox>
			</Stack>
		</TabPanel>
	);
};

TabSettings.propTypes = {
	isCreate: PropTypes.bool,
	tabValue: PropTypes.string,
	form: PropTypes.object,
	handleFormChange: PropTypes.func,
	handleImageChange: PropTypes.func,
	progress: PropTypes.object,
	removeLogo: PropTypes.func,
	errors: PropTypes.object,
};

export default TabSettings;
