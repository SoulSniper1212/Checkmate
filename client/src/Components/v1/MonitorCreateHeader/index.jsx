import { Stack } from "@/Components/v3/ui";
import { Button } from "@/Components/v3/ui";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import MonitorActions from "../MonitorActions/index.jsx";

const CreateMonitorHeader = ({ isAdmin, label, isLoading = true, path, bulkPath }) => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	// Use the provided label or fall back to the translated default

	if (!isAdmin) return null;

	return (
		<Stack direction="row" justifyContent="end" alignItems="center" gap="[var(--spacing-6)]">
			<Button
				loading={isLoading}
				variant="contained"
				color="accent"
				onClick={() => navigate(path)}
			>
				{label || t("createNew")}
			</Button>
			{/* {bulkPath && <MonitorActions isLoading={isLoading} />} */}
		</Stack>
	);
};

export default CreateMonitorHeader;

CreateMonitorHeader.propTypes = {
	isAdmin: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool,
	path: PropTypes.string.isRequired,
	label: PropTypes.string,
	bulkPath: PropTypes.string,
};
