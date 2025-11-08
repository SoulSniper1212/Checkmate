import { Stack, Typography } from "@/Components/v3/ui";
import PropTypes from "prop-types";
import Dot from "../Dot/index.jsx";
/**
 * Host component.
 * This subcomponent receives a params object and displays the host details.
 *
 * @component
 * @param {Object} params - An object containing the following properties:
 * @param {string} params.url - The URL of the host.
 * @param {string} params.title - The name of the host.
 * @param {string} params.percentageColor - The color of the percentage text.
 * @param {number} params.percentage - The percentage to display.
 * @returns {React.ElementType} Returns a div element with the host details.
 */
const Host = ({ url, title, percentageColor, percentage, showURL, className }) => {
	return (
		<Stack className={className}>
			<Stack
				direction="row"
				className="relative items-center gap-4"
			>
				{title}
				{percentageColor && percentage && (
					<>
						<Dot />
						<Typography
							as="span"
							className="font-medium"
							style={{ color: percentageColor }}
						>
							{percentage}%
						</Typography>
					</>
				)}
			</Stack>
			{showURL && <span className="opacity-60">{url}</span>}
		</Stack>
	);
};

Host.propTypes = {
	title: PropTypes.string,
	percentageColor: PropTypes.string,
	percentage: PropTypes.string,
	url: PropTypes.string,
	showURL: PropTypes.bool,
	className: PropTypes.string,
};

export default Host;
