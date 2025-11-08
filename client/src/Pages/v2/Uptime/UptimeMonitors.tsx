import {
	BasePageWithStates,
	UpStatusBox,
	DownStatusBox,
	PausedStatusBox,
} from "@/Components/v2/DesignElements";
import { HeaderCreate } from "@/Components/v2/Monitors";
import { Stack } from "@/Components/v3/ui";
import { MonitorTable } from "@/Pages/v2/Uptime/MonitorTable";

import { useGet } from "@/Hooks/v2/UseApi";
import type { ApiResponse } from "@/Hooks/v2/UseApi";
import type { IMonitor } from "@/Types/Monitor";
import { useIsSmall } from "@/hooks/useMediaQuery";

const UptimeMonitors = () => {
	const isSmall = useIsSmall();

	const { response, isValidating, error, refetch } = useGet<ApiResponse>(
		"/monitors?embedChecks=true",
		{},
		{ refreshInterval: 30000, keepPreviousData: true }
	);
	const monitors: IMonitor[] = response?.data ?? ([] as IMonitor[]);

	const monitorStatuses = monitors.reduce(
		(acc, monitor) => {
			if (monitor.status === "up") {
				acc.up += 1;
			} else if (monitor.status === "down") {
				acc.down += 1;
			} else if (monitor.isActive === false) {
				acc.paused += 1;
			}
			return acc;
		},
		{
			up: 0,
			down: 0,
			paused: 0,
		}
	);

	return (
		<BasePageWithStates
			loading={isValidating}
			error={error}
			items={monitors}
			page="uptime"
			actionLink="create"
		>
			<HeaderCreate
				isLoading={isValidating}
				path="/v2/uptime/create"
			/>
			<Stack
				direction={isSmall ? "column" : "row"}
				spacing="32"
			>
				<UpStatusBox n={monitorStatuses.up} />
				<DownStatusBox n={monitorStatuses.down} />
				<PausedStatusBox n={monitorStatuses.paused} />
			</Stack>
			<MonitorTable
				monitors={monitors}
				refetch={refetch}
			/>
		</BasePageWithStates>
	);
};

export default UptimeMonitors;
