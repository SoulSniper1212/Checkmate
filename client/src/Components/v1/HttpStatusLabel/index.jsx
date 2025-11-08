import PropTypes from "prop-types";
import { BaseLabel } from "../Label/index.jsx";
import { cn } from "@/lib/utils";

/**
 * @component
 * @param {Object} props
 * @param {number} props.status - The http status for the label
 * @param {Styles} props.customStyles - CSS Styles passed from parent component
 * @returns {JSX.Element}
 * @example
 * // Render a http status label
 * <HttpStatusLabel status={404} />
 */

const DEFAULT_CODE = 9999; // Default code for unknown status

const handleStatusCode = (status) => {
	if (status) {
		return status;
	}
	return DEFAULT_CODE;
};

const getRoundedStatusCode = (status) => {
	return Math.floor(status / 100) * 100;
};

const HttpStatusLabel = ({ status, customStyles, className }) => {
	const colors = {
		400: {
			className: "text-yellow-600 border-yellow-400",
		},
		500: {
			className: "text-red-600 border-red-400",
		},
		default: {
			className: "text-foreground border-foreground",
		},
	};

	const statusCode = handleStatusCode(status);
	const config = colors[getRoundedStatusCode(statusCode)] || colors.default;

	return (
		<BaseLabel
			label={String(statusCode)}
			className={cn(config.className, className)}
			styles={customStyles}
		/>
	);
};

HttpStatusLabel.propTypes = {
	status: PropTypes.number,
	customStyles: PropTypes.object,
	className: PropTypes.string,
};

export { HttpStatusLabel };
