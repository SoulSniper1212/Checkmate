import { Stack, Typography, Card } from "@/Components/v3/ui";
import { CircularProgress } from "@/Components/v3/ui/mui-progress";

import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import PropTypes from "prop-types";

import { getHumanReadableDuration } from "../../../../../../Utils/timeUtils.js";
import { formatBytes } from "../../utils/utils.js";
import { useTranslation } from "react-i18next";

const StatsCard = ({ title, value, unit = "", isLoading }) => {
	const theme = useTheme();
	return (
		<Card className="w-[150px] max-w-[150px] h-20 max-h-20">
			{isLoading ? (
				<div className="flex items-center justify-center h-20 max-h-20">
					<CircularProgress color="accent" />
				</div>
			) : (
				<div className="p-4">
					<Typography
						variant="body1"
						style={{ color: theme.palette.primary.contrastText }}
					>
						{title}
					</Typography>
					<Typography variant="body1">
						{value} {unit}
					</Typography>
				</div>
			)}
		</Card>
	);
};

StatsCard.propTypes = {
	title: PropTypes.string,
	value: PropTypes.string,
	unit: PropTypes.string,
	isLoading: PropTypes.bool,
};

const Stats = ({ diagnostics, isLoading }) => {
	const theme = useTheme();
	const { t } = useTranslation();
	return (
		<div
			className="flex flex-row flex-wrap"
			style={{ gap: theme.spacing(4) }}
		>
			<StatsCard
				title={t("diagnosticsPage.stats.eventLoopDelayTitle")}
				value={getHumanReadableDuration(diagnostics?.eventLoopDelayMs)}
				isLoading={isLoading}
			/>
			<StatsCard
				title={t("diagnosticsPage.stats.uptimeTitle")}
				value={getHumanReadableDuration(diagnostics?.uptimeMs)}
				isLoading={isLoading}
			/>

			<StatsCard
				title={t("diagnosticsPage.stats.usedHeapSizeTitle")}
				value={formatBytes(diagnostics?.v8HeapStats?.usedHeapSizeBytes)}
				isLoading={isLoading}
			/>

			<StatsCard
				title={t("diagnosticsPage.stats.totalHeapSizeTitle")}
				value={formatBytes(diagnostics?.v8HeapStats?.totalHeapSizeBytes)}
				isLoading={isLoading}
			/>

			<StatsCard
				title={t("diagnosticsPage.stats.osMemoryLimitTitle")}
				value={formatBytes(diagnostics?.osStats?.totalMemoryBytes)}
				isLoading={isLoading}
			/>
		</div>
	);
};

Stats.propTypes = {
	diagnostics: PropTypes.object,
	isLoading: PropTypes.bool,
};

export default Stats;
