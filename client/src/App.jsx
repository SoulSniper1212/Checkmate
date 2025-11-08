import { useEffect } from "react";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/Utils/Theme/globalTheme.jsx";
import { logger } from "./Utils/Logger"; // Import the logger
import { networkService } from "./main";
import { Routes } from "./Routes";
import AppLayout from "@/Components/v1/Layouts/AppLayout";

function App() {
	const mode = useSelector((state) => state.ui.mode);

	// Cleanup
	useEffect(() => {
		return () => {
			logger.cleanup();
			networkService.cleanup();
		};
	}, []);

	return (
		<ThemeProvider>
			<AppLayout>
				<Routes />
			</AppLayout>
			<ToastContainer />
		</ThemeProvider>
	);
}

export default App;
