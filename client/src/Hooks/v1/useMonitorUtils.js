import { useCallback } from "react";
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";

const useMonitorUtils = () => {
	const getMonitorWithPercentage = useCallback((monitor, theme) => {
		let uptimePercentage = "";
		let percentageColor = "";

		if (monitor?.uptimePercentage !== undefined) {
			uptimePercentage =
				monitor?.uptimePercentage === 0
					? "0"
					: (monitor?.uptimePercentage * 100).toFixed(2);

			percentageColor =
				monitor?.uptimePercentage < 0.25
					? "hsl(var(--destructive))"
					: monitor?.uptimePercentage < 0.5
						? "hsl(var(--warning))"
						: monitor?.uptimePercentage < 0.75
							? "hsl(var(--success))"
							: "hsl(var(--success))";
		}

		return {
			...monitor,
			percentage: uptimePercentage,
			percentageColor,
			monitor: monitor,
		};
	}, []);

	const determineState = useCallback((monitor) => {
		if (typeof monitor === "undefined") return "pending";
		if (monitor?.isActive === false) return "paused";
		if (monitor?.status === undefined) return "pending";
		return monitor?.status == true ? "up" : "down";
	}, []);

	const theme = useTheme();

	const statusColor = {
		up: "hsl(var(--success))",
		down: "hsl(var(--destructive))",
		paused: "hsl(var(--warning))",
		pending: "hsl(var(--muted-foreground))",
	};

	const statusToTheme = {
		up: "success",
		down: "error",
		paused: "warning",
		pending: "secondary",
		"cannot resolve": "tertiary",
	};

	const pagespeedStatusMsg = {
		up: "Live (collecting data)",
		down: "Inactive",
		paused: "Paused",
	};

	return {
		getMonitorWithPercentage,
		determineState,
		statusColor,
		statusToTheme,
		pagespeedStatusMsg,
	};
};

export { useMonitorUtils };
