import { Outlet } from "react-router";
import { Stack } from "@/Components/v3/ui";
import { SideBar } from "@/Components/v2/Layouts/Sidebar";
const RootLayout = () => {
	return (
		<Stack
			direction="row"
			className="min-h-screen"
		>
			<SideBar />
			<div className="flex-1 p-12">
				<Outlet />
			</div>
		</Stack>
	);
};

export default RootLayout;
