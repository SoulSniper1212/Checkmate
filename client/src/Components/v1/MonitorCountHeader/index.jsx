import { Stack } from "@/Components/v3/ui";
import PropTypes from "prop-types";
import SkeletonLayout from "./skeleton.jsx";

const MonitorCountHeader = ({
	isLoading = false,
	monitorCount,
	heading = "monitors",
	sx,
	children,
}) => {
	if (isLoading) return <SkeletonLayout />;

	if (monitorCount === 1) {
		heading = "monitor";
	}

	return (
		<Stack
			direction="row"
			alignItems="center"
			display="flex"
			width="fit-content"
			height="[var(--spacing-18)]"
			gap="[var(--spacing-2)]"
			mt="[var(--spacing-2)]"
			px="[var(--spacing-4)]"
			pt="[var(--spacing-2)]"
			pb="[var(--spacing-3)]"
			borderRadius="[var(--spacing-1)]"
			className="bg-[var(--color-secondary-main)]"
			style={sx}
		>
			{monitorCount} <h2>{heading}</h2>
			{children}
		</Stack>
	);
};

MonitorCountHeader.propTypes = {
	isLoading: PropTypes.bool,
	monitorCount: PropTypes.number,
	heading: PropTypes.string,
	children: PropTypes.node,
	sx: PropTypes.object,
};

export default MonitorCountHeader;
