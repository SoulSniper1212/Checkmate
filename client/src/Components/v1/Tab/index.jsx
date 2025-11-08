import { Box } from "@/Components/v3/ui";
import { TabList } from "@/Components/v3/ui";
import PropTypes from "prop-types";

/**
 * CustomTabList component
 * @param {string} value - The currently selected tab's value.
 * @param {function} onChange - Callback when a different tab is selected.
 * @param {React.ReactNode} children - Tab components to render inside the TabList.
 * @param {object} props - Additional props passed to the TabList component.
 */

const CustomTabList = ({ value, onChange, children, ...props }) => {
	return (
		<Box
			className="mb-12 border-b border-gray-300 [&_.MuiTabs-root]:h-fit [&_.MuiTabs-root]:min-h-0"
		>
			<TabList
				value={value}
				onChange={onChange}
				{...props}
			>
				{children}
			</TabList>
		</Box>
	);
};

CustomTabList.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func,
	children: PropTypes.node,
};

export default CustomTabList;
