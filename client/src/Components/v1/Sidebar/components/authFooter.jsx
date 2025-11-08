import { Stack, Box, Typography, Tooltip, IconButton, Menu, MenuItem, Divider } from "@/Components/v3/ui";
import Avatar from "../../Avatar/index.jsx";
import DotsVertical from "../../../../assets/icons/dots-vertical.svg?react";
import LogoutSvg from "../../../../assets/icons/logout.svg?react";

import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router";
import { clearAuthState } from "../../../../Features/Auth/authSlice.js";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

const getFilteredAccountMenuItems = (user, items) => {
	if (!user) return [];

	let filtered = [...items];

	if (user.role?.includes("demo")) {
		filtered = filtered.filter((item) => item.name !== "Password");
	}

	if (!user.role?.includes("superadmin")) {
		filtered = filtered.filter((item) => item.name !== "Team");
	}

	return filtered;
};

const getRoleDisplayText = (user, t) => {
	if (!user?.role) return "";

	if (user.role.includes("superadmin")) return t("roles.superAdmin");
	if (user.role.includes("admin")) return t("roles.admin");
	if (user.role.includes("user")) return t("roles.teamMember");
	if (user.role.includes("demo")) return t("roles.demoUser");

	return user.role;
};

const AuthFooter = ({ collapsed, accountMenuItems }) => {
	const { t } = useTranslation();
	const authState = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [anchorEl, setAnchorEl] = useState(null);

	const openPopup = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const closePopup = () => {
		setAnchorEl(null);
	};

	const logout = async () => {
		dispatch(clearAuthState());
		navigate("/login");
	};
	const renderAccountMenuItems = (user, items) => {
		const filteredItems = getFilteredAccountMenuItems(user, items);

		return filteredItems.map((item) => (
			<MenuItem
				key={item.name}
				onClick={() => {
					closePopup();
					navigate(item.path);
				}}
				className="gap-2 rounded pl-4"
			>
				{item.icon}
				{item.name}
			</MenuItem>
		));
	};
	return (
		<Stack
			className="flex-row h-[var(--env-var-side-bar-auth-footer-height)] items-center py-4 px-8 gap-2 rounded box-border"
		>
			<Avatar
				small={true}
				onClick={(e) => collapsed && openPopup(e)}
				className={collapsed ? "cursor-pointer" : "cursor-default"}
			/>

			<Stack
				className={"flex-row items-center gap-2 min-w-0"}
				style={{
					maxWidth: collapsed ? 0 : "100%",
					opacity: collapsed ? 0 : 1,
					transition: "opacity 300ms ease, max-width 300ms ease",
					transitionDelay: collapsed ? "0ms" : "300ms",
				}}
			>
				<Stack
					className="ml-2 overflow-hidden"
					style={{
						maxWidth: "50%",
					}}
				>
					<Typography
						className="text-primary-foreground font-medium leading-none text-[var(--env-var-font-size-medium)] block whitespace-nowrap overflow-hidden text-ellipsis"
					>
						{authState.user?.firstName} {authState.user?.lastName}
					</Typography>
					<Typography
						className="text-primary-foreground text-[var(--env-var-font-size-small)] text-ellipsis overflow-hidden whitespace-normal capitalize opacity-80"
					>
						{getRoleDisplayText(authState.user, t)}
					</Typography>
				</Stack>
				<Tooltip
					title={t("navControls")}
					disableInteractive
				>
					<IconButton
						className="ml-[50px] focus:outline-none self-center [&_svg]:w-[22px] [&_svg]:h-[22px] [&_svg_path]:stroke-primary-foreground/70"
						onClick={(event) => openPopup(event)}
					>
						<DotsVertical />
					</IconButton>
				</Tooltip>
			</Stack>
			<Menu
				className="sidebar-popup"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={closePopup}
				disableScrollLock
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				slotProps={{
					paper: {
						className: "-mt-4",
						style: {
							marginLeft: collapsed ? "8px" : 0,
						},
					},
				}}
				MenuListProps={{
					className: "p-2 [&_li]:m-0 [&_li:hover]:bg-transparent",
				}}
				className="ml-4"
			>
				{collapsed && (
					<MenuItem className="cursor-default min-w-[50%]">
						<Box
							className="mb-2 overflow-visible whitespace-nowrap"
							style={{
								minWidth: "50%",
								maxWidth: "max-content",
							}}
						>
							<Typography
								as="span"
								className="font-medium text-[13px] block whitespace-nowrap overflow-visible text-clip"
							>
								{authState.user?.firstName} {authState.user?.lastName}
							</Typography>
							<Typography
								className="capitalize text-[12px] whitespace-nowrap overflow-visible"
							>
								{authState.user?.role}
							</Typography>
						</Box>
					</MenuItem>
				)}
				{/* TODO Do we need two dividers? */}
				{collapsed && <Divider />}
				{/* <Divider /> */}
				{renderAccountMenuItems(authState.user, accountMenuItems)}
				<MenuItem
					onClick={logout}
					className="gap-4 rounded pl-4 [&_svg_path]:stroke-primary-foreground/70"
				>
					<LogoutSvg />
					{t("menu.logOut", "Log out")}
				</MenuItem>
			</Menu>
		</Stack>
	);
};

AuthFooter.propTypes = {
	collapsed: PropTypes.bool,
	accountMenuItems: PropTypes.array,
};

export default AuthFooter;
