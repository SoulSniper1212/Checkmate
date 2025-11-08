import { Stack } from "@/Components/v3/ui";
import { Typography } from "@/Components/v3/ui";
import DataTable from "@/Components/v1/Table/index.jsx";

// Utils
import { useTranslation } from "react-i18next";
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import PropTypes from "prop-types";

const camelToTitle = (str) => {
	return str
		.replace(/([A-Z])/g, " $1")
		.toLowerCase()
		.replace(/^./, (m) => m.toUpperCase());
};

const Metrics = ({ metrics = {} }) => {
	const { t } = useTranslation();
	const theme = useTheme();
	const keys = Object.keys(metrics);

	const headers = [
		{
			id: "metric",
			content: t("queuePage.metricsTable.metricHeader"),
			render: (row) => {
				return <Typography>{row.key}</Typography>;
			},
		},
		{
			id: "value",
			content: t("queuePage.metricsTable.valueHeader"),
			render: (row) => {
				return <Typography>{row.value}</Typography>;
			},
		},
	];

	const data = keys
		.filter((key) => key !== "jobsWithFailures")
		.map((key) => {
			return { key: camelToTitle(key), value: metrics[key] };
		});

	return (
		<Stack gap={0.5rem}>
			<Typography variant="h2">{t("queuePage.metricsTable.title")}</Typography>
			<DataTable
				headers={headers}
				data={data}
			/>
		</Stack>
	);
};

Metrics.propTypes = {
	metrics: PropTypes.object,
};

export default Metrics;
