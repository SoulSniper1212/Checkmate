import PropTypes from "prop-types";
import { Box } from "@/Components/v3/ui";
import "./index.css";

/**
 * @typedef {Object} Styles
 * @param {string} [color] - The text color
 * @param {string} [backgroundColor] - The background color
 * @param {string} [borderColor] - The border color
 */

/**
 * @component
 * @param {Object} props
 * @param {string} props.label - The label of the label
 * @param {Styles} props.styles - CSS Styles passed from parent component
 * @param {React.ReactNode} children - Children passed from parent component
 * @returns {JSX.Element}
 */

const BaseLabel = ({ label, styles, children }) => {
	return (
		<Box
			className="label border border-gray-300 text-gray-900 px-5 py-3 rounded-md inline-flex items-center gap-2"
			style={styles}
		>
			{children}
			{label}
		</Box>
	);
};

BaseLabel.propTypes = {
	label: PropTypes.string.isRequired,
	styles: PropTypes.shape({
		color: PropTypes.string,
		backgroundColor: PropTypes.string,
	}),
	children: PropTypes.node,
};

// Produces a lighter color based on a hex color and a percent
// lightenColor("#067647", 20) will produce a color 20% lighter than #067647
const lightenColor = (color, percent) => {
	let r = parseInt(color.substring(1, 3), 16);
	let g = parseInt(color.substring(3, 5), 16);
	let b = parseInt(color.substring(5, 7), 16);

	const amt = Math.round((255 * percent) / 100);

	r = r + amt <= 255 ? r + amt : 255;
	g = g + amt <= 255 ? g + amt : 255;
	b = b + amt <= 255 ? b + amt : 255;

	r = r.toString(16).padStart(2, "0");
	g = g.toString(16).padStart(2, "0");
	b = b.toString(16).padStart(2, "0");

	return `#${r}${g}${b}`;
};

/**
 * @component
 * @param {Object} props
 * @param {string} props.label - The label of the label
 * @param {string} props.color - The color of the label, specified in #RRGGBB format
 * @returns {JSX.Element}
 * @example
 * // Render a red label
 * <ColoredLabel label="Label" color="#FF0000" />
 */

const ColoredLabel = ({ label, color }) => {
	// If an invalid color is passed, default to gray
	if (typeof color !== "string" || !/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(color)) {
		color = "#6b7280";
	}

	// Calculate lighter shades for border and bg
	const borderColor = lightenColor(color, 20);
	const bgColor = lightenColor(color, 75);

	return (
		<BaseLabel
			label={label}
			styles={{
				color: color,
				borderColor: borderColor,
				backgroundColor: bgColor,
			}}
		></BaseLabel>
	);
};

ColoredLabel.propTypes = {
	label: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
};

/**
 * @component
 * @param {Object} props
 * @param {'up' | 'down' | 'paused' | 'pending' | 'cannot resolve' | 'published' | 'unpublished'} props.status - The status for the label
 * @param {string} props.text - The text of the label
 * @returns {JSX.Element}
 * @example
 * // Render an active label
 * <StatusLabel status="up" text="Active" />
 */

const statusToTheme = {
	up: "success",
	down: "error",
	paused: "warning",
	pending: "warning",
	"cannot resolve": "error",
	published: "success",
	unpublished: "error",
};

const StatusLabel = ({ status, text, customStyles }) => {
	const statusColors = {
		up: { color: "#16a34a", borderColor: "#22c55e", dotColor: "#22c55e" },
		down: { color: "#dc2626", borderColor: "#ef4444", dotColor: "#ef4444" },
		paused: { color: "#ea580c", borderColor: "#f97316", dotColor: "#f97316" },
		pending: { color: "#ea580c", borderColor: "#f97316", dotColor: "#f97316" },
		"cannot resolve": { color: "#dc2626", borderColor: "#ef4444", dotColor: "#ef4444" },
		published: { color: "#16a34a", borderColor: "#22c55e", dotColor: "#22c55e" },
		unpublished: { color: "#dc2626", borderColor: "#ef4444", dotColor: "#ef4444" },
	};

	const colors = statusColors[status] || statusColors.up;

	return (
		<BaseLabel
			label={text}
			style={{
				color: colors.color,
				borderColor: colors.borderColor,
				...customStyles,
			}}
		>
			<Box
				className="w-2 h-2 rounded-full mr-1"
				style={{ backgroundColor: colors.dotColor }}
			/>
		</BaseLabel>
	);
};

StatusLabel.propTypes = {
	status: PropTypes.oneOf([
		"up",
		"down",
		"paused",
		"pending",
		"cannot resolve",
		"published",
		"unpublished",
	]),
	text: PropTypes.string,
	customStyles: PropTypes.object,
};

export { BaseLabel, ColoredLabel, StatusLabel };
