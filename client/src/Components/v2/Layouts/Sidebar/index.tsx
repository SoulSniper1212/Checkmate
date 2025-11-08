import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCollapsed } from "@/Features/UI/uiSlice";
import { useIsSmall } from "@/hooks/useMediaQuery";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

import { CollapseButton } from "@/Components/v2/Layouts/Sidebar/CollapseButton";
import { Stack, Divider } from "@/Components/v3/ui";
import { List } from "@/Components/v3/ui";
import { Logo } from "@/Components/v2/Layouts/Sidebar/Logo";
import { getMenu, getBottomMenu } from "@/Components/v2/Layouts/Sidebar/Menu";
import { NavItem } from "@/Components/v2/Layouts/Sidebar/NavItem";
import { BottomControls } from "@/Components/v2/Layouts/Sidebar/BottomControls";

export const COLLAPSED_WIDTH = 64;
export const EXPANDED_WIDTH = 250;

export const SideBar = () => {
	const isSmall = useIsSmall();
	const dispatch = useDispatch();
	const collapsed = useSelector((state: any) => state.ui.sidebar.collapsed);
	const { t } = useTranslation();
	const navigate = useNavigate();
	const location = useLocation();
	const menu = getMenu(t);
	const bottomMenu = getBottomMenu(t);

	useEffect(() => {
		dispatch(setCollapsed({ collapsed: isSmall }));
	}, [isSmall]);

	return (
		<aside
			className="sticky top-0 h-screen border-r border-border bg-background py-6 flex flex-col gap-6 transition-all duration-700 ease-[cubic-bezier(0.36,-0.01,0,0.77)]"
			style={{
				width: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH
			}}
		>
			<CollapseButton collapsed={collapsed} />
			<Logo collapsed={collapsed} />
			<nav className="px-6 h-full">
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
			</nav>
			<nav className="px-6">
				{bottomMenu.map((item) => {
					const selected = location.pathname.startsWith(`/${item.path}`);

					return (
						<NavItem
							key={item.path}
							item={item}
							collapsed={collapsed}
							selected={selected}
							onClick={() => {
								if (item.url) {
									window.open(item.url, "_blank", "noreferrer");
								} else {
									navigate(`/${item.path}`);
								}
							}}
						/>
					);
				})}
			</nav>
			<Divider className="mt-auto" />
			<BottomControls />
		</aside>
	);
};
