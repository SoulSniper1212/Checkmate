import Sidebar from "../../Sidebar/index.jsx";
import { Outlet } from "react-router";
import { Stack } from "@/Components/v3/ui";

import "./index.css";

const HomeLayout = () => {
	return (
		<Stack
			className="home-layout flex-row gap-14"
			direction="row"
			gap="56px"
		>
			<Sidebar />
			<Stack className="home-content-wrapper">
				<Outlet />
			</Stack>
		</Stack>
	);
};

export default HomeLayout;
