import { Stack } from "@/Components/v3/ui";
import DataTable from "@/Components/v1/Table/index.jsx";
import { Typography } from "@/Components/v3/ui";
// Utils
import PropTypes from "prop-types";
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import { useNavigate } from "react-router-dom";
import { TypeToPathMap } from "../../../../../../Utils/monitorUtils.js";
import { useTranslation } from "react-i18next";
import { createHeaderFactory } from "@/Components/v1/Table/TableUtils.js";

const JobTable = ({ jobs = [] }) => {
	const theme = useTheme();
	const { t } = useTranslation();
	const navigate = useNavigate();
	const buildSx = (row) => {
		if (row.lockedAt) {
			return {
				color: "rgb(34 197 94) !important",
				backgroundColor: "rgb(255 255 255) !important",
			};
		}
		if (!row.active) {
			return {
				color: "rgb(202 138 4) !important",
				backgroundColor: "rgb(255 255 255) !important",
			};
		}

		if (row.failCount > 0 && row.lastFailedAt >= row.lastFinishedAt) {
			return {
				color: "rgb(220 38 38) !important",
				backgroundColor: "rgb(254 242 242) !important",
			};
		}

		return {};
	};

	const createHeader = createHeaderFactory(buildSx);
	const headersData = [
		{
			id: "id",
			content: t("queuePage.jobTable.idHeader"),
			render: (row) => row.monitorId,
		},
		{
			id: "url",
			content: t("queuePage.jobTable.urlHeader"),
			render: (row) => row.monitorUrl,
		},
		{
			id: "interval",
			content: t("queuePage.jobTable.intervalHeader"),
			render: (row) => `${row.monitorInterval} ms`,
		},
		{
			id: "type",
			content: t("queuePage.jobTable.typeHeader"),
			render: (row) => row.monitorType,
		},
		{
			id: "active",
			content: t("queuePage.jobTable.activeHeader"),
			render: (row) => row.active.toString(),
		},
		{
			id: "runCount",
			content: t("queuePage.jobTable.runCountHeader"),
			render: (row) => row.runCount,
		},
		{
			id: "failCount",
			content: t("queuePage.jobTable.failCountHeader"),
			render: (row) => row.failCount,
		},
		{
			id: "lastRun",
			content: t("queuePage.jobTable.lastRunHeader"),
			render: (row) => row.lastRunAt || "-",
		},
		{
			id: "lockedAt",
			content: t("queuePage.jobTable.lockedAtHeader"),
			render: (row) => row.lockedAt || "-",
		},

		{
			id: "lastFinish",
			content: t("queuePage.jobTable.lastFinishedAtHeader"),
			render: (row) => row.lastFinishedAt || "-",
		},
		{
			id: "lastRunTook",
			content: t("queuePage.jobTable.lastRunTookHeader"),
			render: (row) => {
				const value = row.lastRunTook ? row.lastRunTook + " ms" : "-";
				return value;
			},
		},
	];

	const headers = headersData.map((header) => createHeader(header));

	return (
		<Stack gap="0.5rem">
			<Typography variant="h2">{t("queuePage.jobTable.title")}</Typography>
			<DataTable
				headers={headers}
				data={jobs}
				config={{
					onRowClick: (row) => {
						const path = TypeToPathMap[row.monitorType];
						navigate(`/${path}/${row.monitorId}`);
					},
					rowSX: {
						cursor: "pointer",
						"&:hover td": {
							backgroundColor: text-foreground,
							transition: "background-color .3s ease",
						},
					},
				}}
			/>
		</Stack>
	);
};

JobTable.propTypes = {
	jobs: PropTypes.array,
};

export default JobTable;
