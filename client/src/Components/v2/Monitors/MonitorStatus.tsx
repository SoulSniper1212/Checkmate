import type { IMonitor } from "@/Types/Monitor";
import { Stack, Typography } from "@/Components/v3/ui";
import { PulseDot } from "@/Components/v2/DesignElements/PulseDot";
import { Dot } from "@/Components/v2/DesignElements/Dot";
import { getStatusColor, formatUrl } from "@/Utils/v2/MonitorUtils";
import prettyMilliseconds from "pretty-ms";
export const MonitorStatus = ({ monitor }: { monitor: IMonitor }) => {
	if (!monitor) {
		return null;
	}
	return (
		<Stack>
			<Typography
				className="text-xl font-medium text-foreground truncate md:max-w-[calc((100vw-theme(spacing.32))/2)] max-w-full"
				title={monitor.name}
			>
				{monitor.name}
			</Typography>
			<Stack
				direction="row"
				alignItems={"center"}
				gap={1}
			>
				<PulseDot color={getStatusColor(monitor.status)} />
				<Typography
					className="text-base font-bold font-mono text-muted-foreground truncate md:max-w-[calc((100vw-theme(spacing.32))/2)] max-w-full"
					title={formatUrl(monitor?.url)}
				>
					{formatUrl(monitor?.url)}
				</Typography>
				<>
					<Dot />
					<Typography className="hidden md:block text-muted-foreground">
						Checking every {prettyMilliseconds(monitor?.interval, { verbose: true })}
					</Typography>
				</>
			</Stack>
		</Stack>
	);
};
