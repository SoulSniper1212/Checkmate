import { Box } from "@/Components/v3/ui";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Alert from "../Alert/index.jsx";
import PropTypes from "prop-types";

const renderWarningMessage = (t) => {
	return (
		<>
			{t("pageSpeedWarning")}{" "}
			<RouterLink
				to="/settings"
				className="underline inherit-color font-inherit hover:underline"
			>
				{t("pageSpeedLearnMoreLink")}
			</RouterLink>{" "}
			{t("pageSpeedAddApiKey")}
		</>
	);
};

const FallbackPageSpeedWarning = ({ settingsData }) => {
	const { t } = useTranslation();
	return (
		<Box className="w-[80%] max-w-[600px] z-10">
			{settingsData?.pagespeedKeySet === false && (
				<Alert
					variant="warning"
					hasIcon={true}
					body={renderWarningMessage(t)}
				/>
			)}
		</Box>
	);
};

FallbackPageSpeedWarning.propTypes = {
	settingsData: PropTypes.shape({
		pagespeedKeySet: PropTypes.bool,
	}),
};

export default FallbackPageSpeedWarning;
