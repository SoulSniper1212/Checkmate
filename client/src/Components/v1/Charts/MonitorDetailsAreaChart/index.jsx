import PropTypes from "prop-types";
import {
	AreaChart,
	Area,
	XAxis,
	Tooltip,
	CartesianGrid,
	ResponsiveContainer,
	Text,
} from "recharts";
import { Card, Stack } from "@/Components/v3/ui";
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { formatDateWithTz } from "../../../../Utils/timeUtils.js";
import {
	tooltipDateFormatLookup,
	tickDateFormatLookup,
} from "../Utils/chartUtilFunctions.js";

import "./index.css";
const CustomToolTip = ({ active, payload, label, dateRange }) => {
	const format = tooltipDateFormatLookup(dateRange);
	const uiTimezone = useSelector((state) => state.ui.timezone);
	const theme = useTheme();
	if (active && payload && payload.length) {
		const responseTime = payload[0]?.payload?.originalAvgResponseTime
			? payload[0]?.payload?.originalAvgResponseTime
			: (payload[0]?.payload?.avgResponseTime ?? 0);
		return (
			<Card
				className="area-tooltip border-[var(--color-primary-low-contrast)] bg-[var(--color-primary-main)] px-4 py-2"
			>
				<p className="text-xs font-medium text-[var(--color-primary-contrast-text-tertiary)]">
					{formatDateWithTz(label, format, uiTimezone)}
				</p>
				<div className="mt-1">
					<div
						className="inline-block bg-[var(--color-primary-main)] rounded-full"
						style={{ width: '1rem', height: '1rem' }}
					/>
					<Stack
						direction="row"
						justifyContent="space-between"
						className="inline-flex ml-3"
					>
						<span className="opacity-80 text-[11px] font-medium text-[var(--color-primary-contrast-text-tertiary)]">
							Response time:
						</span>
						<span className="ml-4 text-[var(--color-primary-contrast-text-tertiary)]">
							{Math.floor(responseTime)}
							<span className="opacity-80"> ms</span>
						</span>
					</Stack>
				</div>
				{/* Display original value */}
			</Card>
		);
	}
	return null;
};

CustomToolTip.propTypes = {
	active: PropTypes.bool,
	payload: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.number,
			payload: PropTypes.shape({
				_id: PropTypes.string,
				avgResponseTime: PropTypes.number,
				originalAvgResponseTime: PropTypes.number,
			}),
		})
	),
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	dateRange: PropTypes.string,
};
const CustomTick = ({ x, y, payload, dateRange }) => {
	const format = tickDateFormatLookup(dateRange);
	const theme = useTheme();
	const uiTimezone = useSelector((state) => state.ui.timezone);
	return (
		<Text
			x={x}
			y={y + 10}
			textAnchor="middle"
			fill="var(--color-primary-contrast-text-tertiary)"
			fontSize={11}
			fontWeight={400}
		>
			{formatDateWithTz(payload?.value, format, uiTimezone)}
		</Text>
	);
};

CustomTick.propTypes = {
	x: PropTypes.number,
	y: PropTypes.number,
	payload: PropTypes.object,
	index: PropTypes.number,
	dateRange: PropTypes.string,
};

const MonitorDetailsAreaChart = ({ checks, dateRange }) => {
	const memoizedChecks = useMemo(() => checks, [checks[0]]);
	const [isHovered, setIsHovered] = useState(false);
	return (
		<ResponsiveContainer
			width="100%"
			minWidth={25}
			height={220}
		>
			<AreaChart
				width="100%"
				height="100%"
				data={memoizedChecks}
				margin={{
					top: 10,
					right: 0,
					left: 0,
					bottom: 0,
				}}
				onMouseMove={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<CartesianGrid
					stroke="var(--color-primary-low-contrast)"
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
							stopColor="var(--color-accent-main)"
							stopOpacity={0.8}
						/>
						<stop
							offset="100%"
							stopColor="var(--color-accent-light)"
							stopOpacity={0}
						/>
					</linearGradient>
				</defs>
				<XAxis
					stroke="var(--color-primary-low-contrast)"
					dataKey="_id"
					tick={<CustomTick dateRange={dateRange} />}
					axisLine={false}
					tickLine={false}
					height={20}
				/>
				<Tooltip
					cursor={{ stroke: "var(--color-primary-low-contrast)" }}
					content={<CustomToolTip dateRange={dateRange} />}
					wrapperStyle={{ pointerEvents: "none" }}
				/>
				<Area
					type="monotone"
					dataKey="avgResponseTime"
					stroke="var(--color-accent-main)" // CAIO_REVIEW
					fill="url(#colorUv)"
					strokeWidth={isHovered ? 2.5 : 1.5}
					activeDot={{ stroke: "var(--color-accent-main)", r: 5 }} // CAIO_REVIEW
				/>
			</AreaChart>
		</ResponsiveContainer>
	);
};

MonitorDetailsAreaChart.propTypes = {
	checks: PropTypes.array,
	dateRange: PropTypes.string,
};

export default MonitorDetailsAreaChart;
