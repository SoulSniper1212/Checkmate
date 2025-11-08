import PropTypes from "prop-types";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useState } from "react";
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import { Box } from "@/Components/v3/ui";

/**
 * Renders a centered label within a pie chart.
 *
 * @param {Object} props
 * @param {string | number} props.value - The value to display in the label.
 * @param {string} props.color - The color of the text.
 * @returns {JSX.Element}
 */
const PieCenterLabel = ({ value, color, setExpand }) => {
	return (
		<text
			x="50%"
			y="50%"
			textAnchor="middle"
			dominantBaseline="central"
			fill={color}
			fontSize="48"
			style={{
				userSelect: "none",
				pointerEvents: "none",
			}}
			onMouseEnter={() => setExpand(true)}
		>
			{value}
		</text>
	);
};

PieCenterLabel.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	color: PropTypes.string,
	setExpand: PropTypes.func,
};


/**
 * Weight constants for different performance metrics.
 * @type {Object}
 */
const weights = {
	fcp: 10,
	si: 10,
	lcp: 25,
	tbt: 30,
	cls: 25,
};

const CustomPieChart = ({ audits }) => {
	const theme = useTheme();
	const [expand, setExpand] = useState(false);

	/**
	 * Retrieves color properties based on the performance value.
	 *
	 * @param {number} value - The performance score used to determine the color properties.
	 * @returns {{stroke: string, strokeBg: string, text: string, bg: string}} The color properties for the given performance value.
	 */
	const getColors = (value) => {
		if (value >= 90 && value <= 100)
			return {
				stroke: theme.palette.success.main,
				strokeBg: theme.palette.success.lowContrast,
				text: theme.palette.success.contrastText,
				bg: theme.palette.success.lowContrast,
			};
		else if (value >= 50 && value < 90)
			return {
				stroke: theme.palette.warning.main,
				strokeBg: theme.palette.warning.lowContrast,
				text: theme.palette.warning.contrastText,
				bg: theme.palette.warning.lowContrast,
			};
		else if (value >= 0 && value < 50)
			return {
				stroke: theme.palette.error.contrastText,
				strokeBg: theme.palette.error.lowContrast,
				text: theme.palette.error.contrastText,
				bg: theme.palette.error.lowContrast,
			};
		return {
			stroke: theme.palette.tertiary.contrastText,
			strokeBg: theme.palette.tertiary.contrastText,
			text: theme.palette.tertiary.contrastText,
			bg: theme.palette.tertiary.main,
		};
	};

	/**
	 * Calculates performance based on audit scores and weights.
	 *
	 * @returns {number} performance - The calculated performance score.
	 */
	let performance = 0;
	const calculatePerformance = (audits) => {
		if (typeof audits === "undefined") return 0;

		Object.keys(audits).forEach((key) => {
			if (audits[key].score) {
				let value = audits[key].score * weights[key];
				performance += Math.floor(value);
			}
		});

		return performance;
	};

	performance = calculatePerformance(audits);
	const colorMap = getColors(performance);

	const data = [
		{ name: 'performance', value: performance, color: colorMap.stroke },
		{ name: 'remaining', value: 100 - performance, color: colorMap.bg }
	];

	return (
		<Box
			onMouseLeave={() => setExpand(false)}
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				width: "100%",
				height: "230px",
			}}
		>
			<ResponsiveContainer width={230} height={230}>
				<RechartsPieChart>
					<Pie
						data={data}
						cx={115}
						cy={115}
						innerRadius={73}
						outerRadius={80}
						startAngle={90}
						endAngle={-270}
						dataKey="value"
					>
						{data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={entry.color} />
						))}
					</Pie>
				</RechartsPieChart>
			</ResponsiveContainer>
			<PieCenterLabel
				value={performance}
				color={colorMap.text}
				setExpand={setExpand}
			/>
		</Box>
	);
};

CustomPieChart.propTypes = {
	audits: PropTypes.object,
};

export default CustomPieChart;
