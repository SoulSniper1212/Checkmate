import { BaseChart } from "./HistogramStatus";
import { BaseBox } from "../DesignElements";
import ResponseTimeIcon from "@/assets/icons/response-time-icon.svg?react";
import { normalizeResponseTimes } from "@/Utils/v2/DataUtils";
import {
	AreaChart,
	Area,
	XAxis,
	Tooltip,
	CartesianGrid,
	ResponsiveContainer,
	Text,
} from "recharts";
import { Typography } from "@/Components/v3/ui";

import {
	formatDateWithTz,
	tickDateFormatLookup,
	tooltipDateFormatLookup,
} from "@/Utils/v2/TimeUtils";
import type { GroupedCheck } from "@/Types/Check";
import { useSelector } from "react-redux";

type XTickProps = {
	x: number;
	y: number;
	payload: { value: any };
	range: string;
};

const XTick: React.FC<XTickProps> = ({ x, y, payload, range }) => {
	const format = tickDateFormatLookup(range);
	const uiTimezone = useSelector((state: any) => state.ui.timezone);
	return (
		<Text
			x={x}
			y={y + 10}
			textAnchor="middle"
			fill="hsl(var(--muted-foreground))"
			fontSize={11}
			fontWeight={400}
		>
			{formatDateWithTz(payload?.value, format, uiTimezone)}
		</Text>
	);
};

type ResponseTimeToolTipProps = {
	active?: boolean | undefined;
	payload?: any[];
	label?: string;
	range: string;
	uiTimezone: string;
};

const ResponseTimeToolTip: React.FC<ResponseTimeToolTipProps> = ({
	active,
	payload,
	label,
	range,
	uiTimezone,
}) => {
	if (!label) return null;
	if (!payload) return null;
	if (!active) return null;

	const format = tooltipDateFormatLookup(range);
	const responseTime = Math.floor(payload?.[0]?.payload?.avgResponseTime || 0);
	return (
		<BaseBox className="p-4 border border-border bg-background shadow-lg rounded-lg">
			<Typography className="text-sm">{formatDateWithTz(label, format, uiTimezone)}</Typography>
			<Typography className="text-sm font-medium">Response time: {responseTime} ms</Typography>
		</BaseBox>
	);
};

export const ChartResponseTime = ({
	checks,
	range,
}: {
	checks: GroupedCheck[];
	range: string;
}) => {
	const uiTimezone = useSelector((state: any) => state.ui.timezone);
	const normalized = normalizeResponseTimes<GroupedCheck, "avgResponseTime">(
		checks,
		"avgResponseTime"
	);
	return (
		<BaseChart
			icon={<ResponseTimeIcon />}
			title="Response times"
		>
			<ResponsiveContainer
				width="100%"
				height={300}
			>
				<AreaChart data={normalized?.slice().reverse()}>
					<CartesianGrid
						stroke="hsl(var(--border))"
						strokeWidth={1}
						strokeOpacity={1}
						fill="transparent"
						vertical={false}
					/>
					<defs>
						<linearGradient
							id="colorUv"
							x1="0"
							y1="0"
							x2="0"
							y2="1"
						>
							<stop
								offset="0%"
								stopColor="hsl(var(--primary))"
								stopOpacity={0.8}
							/>
							<stop
								offset="100%"
								stopColor="hsl(var(--primary))"
								stopOpacity={0}
							/>
						</linearGradient>
					</defs>
					<XAxis
						axisLine={false}
						tickLine={false}
						dataKey="_id"
						tick={(props) => (
							<XTick
								{...props}
								range={range}
							/>
						)}
					/>

					<Tooltip
						content={(props) => (
							<ResponseTimeToolTip
								{...props}
								range={range}
								uiTimezone={uiTimezone}
							/>
						)}
					/>
					<Area
						type="monotone"
						dataKey="normalResponseTime"
						stroke="hsl(var(--primary))"
						fill="url(#colorUv)"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</BaseChart>
	);
};
