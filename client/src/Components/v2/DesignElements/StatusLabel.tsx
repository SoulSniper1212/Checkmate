import { Box } from "@/Components/v3/ui";
import { BaseBox } from "@/Components/v2/DesignElements";
import type { MonitorStatus } from "@/Types/Monitor";

import { getStatusPalette } from "@/Utils/v2/MonitorUtils";

export const StatusLabel = ({
	status,
	isActive,
}: {
	status: MonitorStatus;
	isActive?: boolean;
}) => {
	const palette = getStatusPalette(status);
	const transformedText = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

	// Map palette to CSS custom properties
	const getColorClasses = (palette: string) => {
		switch (palette) {
			case "success":
				return "text-success border-success/20 bg-success/10";
			case "error":
				return "text-destructive border-destructive/20 bg-destructive/10";
			case "warning":
				return "text-warning border-warning/20 bg-warning/10";
			case "info":
				return "text-primary border-primary/20 bg-primary/10";
			default:
				return "text-muted-foreground border-muted bg-muted/50";
		}
	};

	return (
		<BaseBox
			className={`inline-flex items-center justify-center px-5 py-3 ${getColorClasses(palette)}`}
		>
			<div
				className="w-[7px] h-[7px] rounded-full mr-[5px] bg-current opacity-20"
			/>
			{isActive === false ? "Paused" : transformedText}
		</BaseBox>
	);
};
