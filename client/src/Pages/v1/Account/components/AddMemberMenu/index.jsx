import { useState } from "react";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/v3/ui";
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import { useTranslation } from "react-i18next";
import Proptypes from "prop-types";

// Custom arrow icon
const ArrowDropDownIcon = () => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
		<path d="M7 10l5 5 5-5z"/>
	</svg>
);

const AddMemberMenu = ({ handleInviteOpen, handleIsRegisterOpen }) => {
	const { t } = useTranslation();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="default"
					className="flex items-center gap-2"
				>
					{t("teamPanel.addTeamMember.addMemberMenu")}
					<ArrowDropDownIcon />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onClick={handleInviteOpen}>
					{t("teamPanel.inviteTeamMember")}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleIsRegisterOpen(true)}>
					{t("teamPanel.register")}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

AddMemberMenu.propTypes = {
	handleInviteOpen: Proptypes.func.isRequired,
	handleIsRegisterOpen: Proptypes.func.isRequired,
};

export default AddMemberMenu;
