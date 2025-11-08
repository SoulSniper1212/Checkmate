import { Stack, Divider } from "@/Components/v3/ui";
import { List } from "@/Components/v3/ui";
import Logo from "./components/logo.jsx";
import CollapseButton from "./components/collapseButton.jsx";
import NavItem from "./components/navItem.jsx";
import AuthFooter from "./components/authFooter.jsx";

import StarPrompt from "../StarPrompt/index.jsx";
import LockSvg from "../../../assets/icons/lock.svg?react";
import UserSvg from "../../../assets/icons/user.svg?react";
import TeamSvg from "../../../assets/icons/user-two.svg?react";
import Support from "../../../assets/icons/support.svg?react";
import Maintenance from "../../../assets/icons/maintenance.svg?react";
import Monitors from "../../../assets/icons/monitors.svg?react";
import Incidents from "../../../assets/icons/incidents.svg?react";
import Integrations from "../../../assets/icons/integrations.svg?react";
import PageSpeed from "../../../assets/icons/page-speed.svg?react";
import Settings from "../../../assets/icons/settings.svg?react";
import ChangeLog from "../../../assets/icons/changeLog.svg?react";
import Docs from "../../../assets/icons/docs.svg?react";
import StatusPages from "../../../assets/icons/status-pages.svg?react";
import Discussions from "../../../assets/icons/discussions.svg?react";
import Notifications from "../../../assets/icons/notifications.svg?react";
import Logs from "../../../assets/icons/logs.svg?react";

// Utils
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";

const URL_MAP = {
	support: "https://discord.com/invite/NAb6H3UTjK",
	discussions: "https://github.com/bluewave-labs/checkmate/discussions",
	docs: "https://bluewavelabs.gitbook.io/checkmate",
	changelog: "https://github.com/bluewave-labs/checkmate/releases",
};

const getMenu = (t) => [
	{ name: t("menu.uptime"), path: "uptime", icon: <Monitors /> },
	{ name: t("menu.pagespeed"), path: "pagespeed", icon: <PageSpeed /> },

	{ name: t("menu.infrastructure"), path: "infrastructure", icon: <Integrations /> },
	{
		name: t("menu.notifications"),
		path: "notifications",
		icon: <Notifications />,
	},
	{ name: t("menu.incidents"), path: "incidents", icon: <Incidents /> },

	{ name: t("menu.statusPages"), path: "status", icon: <StatusPages /> },
	{ name: t("menu.maintenance"), path: "maintenance", icon: <Maintenance /> },
	{ name: t("menu.logs"), path: "logs", icon: <Logs /> },

	{
		name: t("menu.settings"),
		icon: <Settings />,
		path: "settings",
	},
];

const getOtherMenuItems = (t) => [
	{ name: t("menu.support"), path: "support", icon: <Support /> },
	{
		name: t("menu.discussions"),
		path: "discussions",
		icon: <Discussions />,
	},
	{ name: t("menu.docs"), path: "docs", icon: <Docs /> },
	{ name: t("menu.changelog"), path: "changelog", icon: <ChangeLog /> },
];

const getAccountMenuItems = (t) => [
	{ name: t("menu.profile"), path: "account/profile", icon: <UserSvg /> },
	{ name: t("menu.password"), path: "account/password", icon: <LockSvg /> },
	{ name: t("menu.team"), path: "account/team", icon: <TeamSvg /> },
];

const Sidebar = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const location = useLocation();
	// Redux state
	const collapsed = useSelector((state) => state.ui.sidebar.collapsed);

	const menu = getMenu(t);
	const otherMenuItems = getOtherMenuItems(t);
	const accountMenuItems = getAccountMenuItems(t);

	return (
		<Stack
			className="h-screen sticky top-0 border-r py-6 gap-6 transition-all duration-650 ease-in-out"
			style={{
				width: collapsed
					? "var(--env-var-side-bar-collapsed-width)"
					: "var(--env-var-side-bar-width)",
				borderColor: "hsl(var(--border))",
			}}
		>
			<CollapseButton collapsed={collapsed} />
			<Logo collapsed={collapsed} />
			<List
				className="h-full px-6"
				role="navigation"
				aria-label="Main navigation"
			>
				{menu.map((item) => {
					const selected = location.pathname.startsWith(`/${item.path}`);
					return (
						<NavItem
							key={item.path}
							item={item}
							collapsed={collapsed}
							selected={selected}
							onClick={() => navigate(`/${item.path}`)}
						/>
					);
				})}
			</List>
			{!collapsed && <StarPrompt />}
			<List
				className="px-6"
				role="navigation"
				aria-label="Additional navigation"
			>
				{otherMenuItems.map((item) => {
					const selected = location.pathname.startsWith(`/${item.path}`);

					return (
						<NavItem
							key={item.path}
							item={item}
							collapsed={collapsed}
							selected={selected}
							onClick={() => {
								const url = URL_MAP[item.path];
								if (url) {
									window.open(url, "_blank", "noreferrer");
								} else {
									navigate(`/${item.path}`);
								}
							}}
						/>
					);
				})}
			</List>
			<Divider className="mt-auto" />
			<AuthFooter
				collapsed={collapsed}
				accountMenuItems={accountMenuItems}
			/>
		</Stack>
	);
};

export default Sidebar;
