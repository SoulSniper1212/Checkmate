import { Stack, Box, Typography } from "@/Components/v3/ui";
import { BaseBox } from "@/Components/v2/DesignElements";
import { ResponsiveContainer, BarChart, XAxis, Bar, Cell } from "recharts";
import UptimeIcon from "@/assets/icons/uptime-icon.svg?react";
import IncidentsIcon from "@/assets/icons/incidents.svg?react";

import type { GroupedCheck } from "@/Types/Check";
import type { MonitorStatus } from "@/Types/Monitor";

import { normalizeResponseTimes } from "@/Utils/v2/DataUtils";
import { useState } from "react";
import { formatDateWithTz } from "@/Utils/v2/TimeUtils";
import { useSelector } from "react-redux";
import { getResponseTimeColor } from "@/Utils/v2/MonitorUtils";

const XLabel = ({
	p1,
	p2,
	range,
}: {
	p1: GroupedCheck;
	p2: GroupedCheck;
	range: string;
}) => {
	const uiTimezone = useSelector((state: any) => state.ui.timezone);
	const dateFormat = range === "day" ? "MMM D, h:mm A" : "MMM D";
	return (
		<>
			<text
				x={0}
				y="100%"
				dy={-3}
				textAnchor="start"
				fontSize={11}
				fill="hsl(var(--muted-foreground))"
			>
				{formatDateWithTz(p1._id, dateFormat, uiTimezone)}
			</text>
			<text
				x="100%"
				y="100%"
				dy={-3}
				textAnchor="end"
				fontSize={11}
				fill="hsl(var(--muted-foreground))"
			>
				{formatDateWithTz(p2._id, dateFormat, uiTimezone)}
			</text>
		</>
	);
};

type BaseChartProps = React.PropsWithChildren<{
	icon: React.ReactNode;
	title: string;
}>;

export const BaseChart: React.FC<BaseChartProps> = ({ children, icon, title }) => {
	return (
		<BaseBox className="p-8 flex flex-1">
			<Stack
				gap={2}
				flex={1}
			>
				<Stack
					direction="row"
					alignItems={"center"}
					gap={1}
				>
					<BaseBox className="flex items-center justify-center w-8 h-8 bg-secondary [&_svg]:w-5 [&_svg]:h-5 [&_svg_path]:stroke-muted-foreground">
						{icon}
					</BaseBox>
					<Typography variant="h2">{title}</Typography>
				</Stack>
				<Box flex={1}>{children}</Box>
			</Stack>
		</BaseBox>
	);
};

export const HistogramStatus = ({
	checks,
	status,
	range,
	title,
}: {
	checks: GroupedCheck[];
	status: MonitorStatus;
	range: string;
	title: string;
}) => {
	const uiTimezone = useSelector((state: any) => state.ui.timezone);

	const icon = status === "up" ? <UptimeIcon /> : <IncidentsIcon />;
	const [idx, setIdx] = useState<number | null>(null);
	const dateFormat = range === "1d" || range === "2h" ? "MMM D, h A" : "MMM D";
	const normalChecks = normalizeResponseTimes(checks, "avgResponseTime");

	if (normalChecks.length === 0) {
		return (
			<BaseChart
				icon={icon}
				title={title}
			>
				<Stack
					height={"100%"}
					alignItems={"center"}
					justifyContent={"center"}
				>
					<Typography variant="h2">
						{status === "up" ? "No checks yet" : "Great, no downtime yet!"}
					</Typography>
				</Stack>
			</BaseChart>
		);
	}

	const totalChecks = normalChecks.reduce((count, check) => {
		return count + check.count;
	}, 0);

	return (
		<BaseChart
			icon={icon}
			title={title}
		>
			<Stack gap={2}>
				<Stack
					position="relative"
					direction="row"
					justifyContent="space-between"
				>
					<Stack>
						<Typography>Total checks</Typography>
						{idx ? (
							<Stack>
								<Typography variant="h2">{normalChecks[idx].count}</Typography>
								<Typography
									position={"absolute"}
									top={"100%"}
								>
									{formatDateWithTz(normalChecks[idx]._id, dateFormat, uiTimezone)}
								</Typography>
							</Stack>
						) : (
							<Typography variant="h2">{totalChecks}</Typography>
						)}
					</Stack>
				</Stack>
				<ResponsiveContainer
					width="100%"
					height={155}
				>
					<BarChart data={normalChecks}>
						<XAxis
							stroke="hsl(var(--border))"
							height={15}
							tick={false}
							label={
								<XLabel
									p1={normalChecks[0]}
									p2={normalChecks[normalChecks.length - 1]}
									range={range}
								/>
							}
						/>
						<Bar
							dataKey="normalResponseTime"
							maxBarSize={7}
							background={{ fill: "transparent" }}
						>
							{normalChecks?.map((groupedCheck, idx) => {
								const fillColor = getResponseTimeColor(groupedCheck.normalResponseTime);
								// Map color names to CSS custom properties
								const colorMap: { [key: string]: string } = {
									primary: "hsl(var(--primary))",
									success: "hsl(var(--success))",
									warning: "hsl(var(--warning))",
									destructive: "hsl(var(--destructive))",
									secondary: "hsl(var(--secondary))",
									muted: "hsl(var(--muted))"
								};
								return (
									<Cell
										onMouseEnter={() => setIdx(idx)}
										onMouseLeave={() => setIdx(null)}
										key={groupedCheck._id}
										fill={colorMap[fillColor] || "hsl(var(--primary))"}
									/>
								);
							})}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</Stack>
		</BaseChart>
	);
};
