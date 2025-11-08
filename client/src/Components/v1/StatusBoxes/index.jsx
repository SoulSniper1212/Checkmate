// Components
import { Stack } from "@/Components/v3/ui";
import SkeletonLayout from "./skeleton.jsx";
// Utils
import PropTypes from "prop-types";
const StatusBoxes = ({ shouldRender = true, flexWrap = "nowrap", children }) => {
	if (!shouldRender) {
		return (
			<SkeletonLayout
				numBoxes={children?.length ?? 1}
				flexWrap={flexWrap}
			/>
		);
	}

	return (
		<Stack
			direction="row"
			flexWrap={flexWrap}
			gap="32px"
			justifyContent="flex-start"
			display="flex"
		>
			{children}
		</Stack>
	);
};

StatusBoxes.propTypes = {
	shouldRender: PropTypes.bool,
	flexWrap: PropTypes.string,
	children: PropTypes.node,
};

export default StatusBoxes;
