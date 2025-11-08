// Components
import { Stack, Typography, Button } from "@/Components/v3/ui";
import Breadcrumbs from "@/Components/v1/Breadcrumbs/index.jsx";
import DataTable from "@/Components/v1/Table/index.jsx";
import ActionMenu from "./components/ActionMenu.jsx";
import PageStateWrapper from "@/Components/v1/PageStateWrapper/index.jsx";

// Utils
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	useGetNotificationsByTeamId,
	useDeleteNotification,
} from "../../../Hooks/v1/useNotifications.js";
import { useTranslation } from "react-i18next";

const Notifications = () => {
	const navigate = useNavigate();
	const BREADCRUMBS = [{ name: "notifications", path: "/notifications" }];
	const [updateTrigger, setUpdateTrigger] = useState(false);
	const [notifications, isLoading, error] = useGetNotificationsByTeamId(updateTrigger);
	const [deleteNotification, isDeleting, deleteError] = useDeleteNotification();
	const { t } = useTranslation();
	// Handlers
	const triggerUpdate = () => {
		setUpdateTrigger(!updateTrigger);
	};

	const onDelete = (id) => {
		deleteNotification(id, triggerUpdate);
	};

	const headers = [
		{
			id: "name",
			content: "Name",
			render: (row) => {
				return row.notificationName;
			},
		},
		{
			id: "target",
			content: "Target",
			render: (row) => {
				return row.address;
			},
		},
		{
			id: "platform",
			content: "Platform",
			render: (row) => {
				return row?.config?.platform || row.type;
			},
		},

		{
			id: "actions",
			content: "Actions",
			onClick: (e) => {
				e.stopPropagation();
			},
			render: (row) => {
				return (
					<ActionMenu
						notification={row}
						onDelete={onDelete}
					/>
				);
			},
		},
	];

	return (
		<>
			<PageStateWrapper
				networkError={error}
				isLoading={isLoading}
				items={notifications}
				type="notifications"
				fallbackLink="/notifications/create"
			>
				<Stack gap="40px">
					<Breadcrumbs list={BREADCRUMBS} />
					<Stack
						direction="row"
						justifyContent="flex-end"
					>
						<Button
							variant="default"
							onClick={() => navigate("/notifications/create")}
						>
							{t("notifications.createButton")}
						</Button>
					</Stack>
					<Typography variant="h1">{t("notifications.createTitle")}</Typography>
					<DataTable
						config={{
							onRowClick: (row) => navigate(`/notifications/${row._id}`),
							rowSX: {
								cursor: "pointer",
								"&:hover td": {
									backgroundColor: "#f3f4f6",
									transition: "background-color .3s ease",
								},
							},
						}}
						headers={headers}
						data={notifications}
					/>
				</Stack>
			</PageStateWrapper>
		</>
	);
};

export default Notifications;
