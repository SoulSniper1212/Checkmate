import DataTable from "@/Components/v1/Table/index.jsx";
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import { useNavigate } from "react-router-dom";
import { StatusLabel } from "@/Components/v1/Label/index.jsx";
import { ExternalLink } from "lucide-react";
import { Stack, Typography } from "@/Components/v3/ui";
import { useTranslation } from "react-i18next";
const StatusPagesTable = ({ data }) => {
	const theme = useTheme();
	const { t } = useTranslation();
	const navigate = useNavigate();
	const headers = [
		{
			id: "name",
			content: t("statusPageName"),
			render: (row) => {
				return row.companyName;
			},
		},
		{
			id: "url",
			content: t("publicURL"),
			onClick: (e, row) => {
				if (row.isPublished) {
					e.stopPropagation();
					const url = `/status/uptime/public/${row.url}`;
					window.open(url, "_blank", "noopener,noreferrer");
				}
			},
			render: (row) => {
				const content = row.isPublished ? `/${row.url}` : "Unpublished";
				return (
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="center"
						gap="0.5rem"
						paddingLeft="0.5rem"
						paddingRight="0.5rem"
						sx={{
							...(row.isPublished && {
								display: "inline-flex",
								":hover": {
									cursor: "pointer",
									borderBottom: 1,
								},
							}),
						}}
					>
						<Typography>{content}</Typography>
						{row.isPublished && <ExternalLink />}
					</Stack>
				);
			},
		},
		{
			id: "type",
			content: t("type"),
			render: (row) => {
				return row.type;
			},
		},
		{
			id: "status",
			content: t("status"),
			render: (row) => {
				const status = row.isPublished ? "published" : "unpublished";
				return (
					<StatusLabel
						status={status}
						text={row.isPublished ? "Published" : "Unpublished"}
					/>
				);
			},
		},
	];

	const handleRowClick = (statusPage) => {
		navigate(`/status/uptime/${statusPage.url}`);
	};

	return (
		<DataTable
			config={{
				rowSX: {
					cursor: "pointer",
					"&:hover td": {
						backgroundColor: text-foreground,
						transition: "background-color .3s ease",
					},
				},
				onRowClick: (row) => {
					handleRowClick(row);
				},
			}}
			headers={headers}
			data={data}
		/>
	);
};

export default StatusPagesTable;
