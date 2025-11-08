import PropTypes from "prop-types";
import { Stack } from "@/Components/v3/ui";
import StatusBox from "./statusBox.jsx";
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import { useTranslation } from "react-i18next";
import SkeletonLayout from "./skeleton.jsx";

const StatusBoxes = ({ shouldRender, monitorsSummary }) => {
	const theme = useTheme();
	const { t } = useTranslation();
	if (!shouldRender) return <SkeletonLayout shouldRender={shouldRender} />;
	return (
		<Stack
			className="gap-[var(--spacing-8)] flex-row justify-between"
		>
			<StatusBox
				title={t("monitorStatus.up")}
				status="up"
				value={monitorsSummary?.upMonitors ?? 0}
			/>
			<StatusBox
				title={t("monitorStatus.down")}
				status="down"
				value={monitorsSummary?.downMonitors ?? 0}
			/>
			<StatusBox
				title={t("monitorStatus.paused")}
				status="paused"
				value={monitorsSummary?.pausedMonitors ?? 0}
			/>
		</Stack>
	);
};

StatusBoxes.propTypes = {
	monitorsSummary: PropTypes.object,
	shouldRender: PropTypes.bool,
};

export default StatusBoxes;
