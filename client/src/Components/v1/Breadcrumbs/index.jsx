import PropTypes from "prop-types";
import { Box } from "@/Components/v3/ui";
import { useNavigate } from "react-router-dom";
import ArrowRight from "../ArrowRight/index.jsx";
import "./index.css";

// Breadcrumbs component - v1 migrated

/**
 * Breadcrumbs component that displays a list of breadcrumb items.
 *
 * @param {Object} props
 * @param {Array} props.list - Array of breadcrumb items. Each item should have `name` and `path` properties.
 * @param {string} props.list.name - The name to display for the breadcrumb.
 * @param {string} props.list.path - The path to navigate to when the breadcrumb is clicked.
 *
 * @returns {JSX.Element} The rendered Breadcrumbs component.
 */

const Breadcrumbs = ({ list }) => {
	const navigate = useNavigate();

	return (
		<nav
			aria-label="breadcrumb"
			className="px-2 py-3.5 w-fit bg-gray-100 rounded-lg leading-[18px] flex items-center gap-2"
		>
			{list.map((item, index) => {
				const isLast = index === list.length - 1;
				return (
					<div key={`${item.name}-${index}`} className="flex items-center">
						<Box
							component="a"
							className={`px-4 pt-2 pb-3 rounded-lg opacity-80 capitalize text-gray-900 hover:bg-gray-200 transition-colors duration-200 cursor-pointer ${
								isLast ? 'opacity-100 cursor-default' : ''
							}`}
							onClick={() => !isLast && navigate(item.path)}
						>
							{item.name}
						</Box>
						{!isLast && <ArrowRight />}
					</div>
				);
			})}
		</nav>
	);
};

Breadcrumbs.propTypes = {
	list: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			path: PropTypes.string.isRequired,
		}).isRequired
	).isRequired,
};

export default Breadcrumbs;
