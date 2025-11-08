import { IconButton } from "@/Components/v3/ui";
import ArrowRight from "../../ArrowRight/index.jsx";
import ArrowLeft from "../../ArrowLeft/index.jsx";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../../../Features/UI/uiSlice.js";
import PropTypes from "prop-types";

const CollapseButton = ({ collapsed }) => {
	const dispatch = useDispatch();
	const arrowIcon = collapsed ? (
		<ArrowRight
			height="var(--spacing-8)"
			width="var(--spacing-8)"
			color="var(--color-primary-contrast-text-secondary)"
		/>
	) : (
		<ArrowLeft
			height="var(--spacing-8)"
			width="var(--spacing-8)"
			color="var(--color-primary-contrast-text-secondary)"
		/>
	);
	return (
		<IconButton
			className="absolute top-[60px] right-0 translate-x-1/2 bg-[var(--color-tertiary-main)] border border-[var(--color-primary-low-contrast)] p-[var(--spacing-2-5)] focus:outline-none hover:bg-[var(--color-primary-low-contrast)] hover:border-[var(--color-primary-low-contrast)]"
			onClick={() => {
				dispatch(toggleSidebar());
			}}
		>
			{arrowIcon}
		</IconButton>
	);
};

CollapseButton.propTypes = {
	collapsed: PropTypes.bool.isRequired,
};
export default CollapseButton;
