import { Typography } from "@/Components/v3/ui";
import DataTable from "@/Components/v1/Table/index.jsx";
import { Trash2 } from "lucide-react";

import { useTranslation } from "react-i18next";
import { ROLES } from "../../../../../Utils/roleUtils.js";

const RoleTable = ({ roles, handleDeleteRole }) => {
	const { t } = useTranslation();
	const HEADERS = [
		{
			id: "name",
			content: <Typography>{t("editUserPage.table.roleHeader")}</Typography>,
			render: (row) => {
				return row;
			},
		},
		{
			id: "delete",
			content: <Typography>{t("editUserPage.table.actionHeader")}</Typography>,
			render: (row) => {
				if (row === ROLES.SUPERADMIN) return null;
				return (
					<Trash2
						onClick={() => {
							handleDeleteRole(row);
						}}
						className="cursor-pointer"
					/>
				);
			},
		},
	];
	return (
		<DataTable
			headers={HEADERS}
			data={roles}
		/>
	);
};

export default RoleTable;
