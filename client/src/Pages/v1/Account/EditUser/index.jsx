// Components
import { Stack, Typography, Button } from "@/Components/v3/ui";
import Breadcrumbs from "@/Components/v1/Breadcrumbs/index.jsx";
import TextInput from "@/Components/v1/Inputs/TextInput/index.jsx";
import Search from "@/Components/v1/Inputs/Search/index.jsx";
import RoleTable from "../components/RoleTable/index.jsx";
import ChangePasswordModal from "@/Pages/Account/components/ChangePasswordModal/index.jsx";
// Utils
import { useParams } from "react-router-dom";
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import { useTranslation } from "react-i18next";
import { useGetUser, useEditUser } from "../../../../Hooks/v1/userHooks.js";
import { EDITABLE_ROLES, ROLES } from "../../../../Utils/roleUtils.js";
import { useEditUserForm, useValidateEditUserForm } from "./hooks/editUser.js";
import { useSelector } from "react-redux";

const EditUser = () => {
	const { user } = useSelector((state) => state.auth);
	const { userId } = useParams();
	const isSameUser = user?._id === userId;
	const theme = useTheme();
	const { t } = useTranslation();
	const BREADCRUMBS = [
		{ name: t("menu.team"), path: "/account/team" },
		{ name: t("editUserPage.title"), path: "" },
	];

	const [userToEdit, isLoading, error] = useGetUser(userId);
	const [editUser, isSaving, saveError, changePassword] = useEditUser(userId);
	const [
		form,
		setForm,
		handleRoleChange,
		handleDeleteRole,
		searchInput,
		handleSearchInput,
	] = useEditUserForm(userToEdit);
	const [errors, validateForm, validateField] = useValidateEditUserForm();

	const onChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		validateField(name, value);
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const valid = validateForm(form);
		if (valid) {
			editUser(form);
		}
	};

	return (
		<Stack className="gap-[var(--spacing-20)]">
			<Breadcrumbs list={BREADCRUMBS} />
			<Typography variant="h2">{t("editUserPage.title")}</Typography>
			<Stack
				component="form"
				onSubmit={handleSubmit}
				className="gap-[var(--spacing-12)] max-w-[50%]"
			>
				<TextInput
					name="firstName"
					label={t("editUserPage.form.firstName")}
					value={form?.firstName}
					onChange={onChange}
					error={errors?.firstName ? true : false}
					helperText={t(errors?.firstName)}
				/>
				<TextInput
					name="lastName"
					label={t("editUserPage.form.lastName")}
					value={form?.lastName}
					onChange={onChange}
					error={errors?.lastName ? true : false}
					helperText={t(errors?.lastName)}
				/>
				<TextInput
					name="email"
					label={t("editUserPage.form.email")}
					value={form?.email}
					disabled={true}
					error={errors?.email ? true : false}
					helperText={t(errors?.email)}
				/>
				<Search
					label={t("editUserPage.form.role")}
					filteredBy="role"
					inputValue={searchInput}
					handleInputChange={handleSearchInput}
					value={
						form?.role
							?.filter((role) => role !== ROLES.SUPERADMIN)
							.map((role) => ({ role, _id: role })) || []
					}
					options={EDITABLE_ROLES}
					multiple={true}
					handleChange={handleRoleChange}
				/>
				<RoleTable
					roles={form?.role}
					handleDeleteRole={handleDeleteRole}
				/>
				<Stack
					className="flex-row gap-[var(--spacing-10)] mt-[var(--spacing-8)]"
				>
					<Button
						type="submit"
						muiVariant="contained"
						color="primary"
						loading={isLoading || isSaving}
					>
						{t("editUserPage.form.save")}
					</Button>
					{!isSameUser && (
						<ChangePasswordModal
							isSaving={isSaving}
							isLoading={isLoading}
							changePassword={changePassword}
						/>
					)}
				</Stack>
			</Stack>
		</Stack>
	);
};

export default EditUser;
