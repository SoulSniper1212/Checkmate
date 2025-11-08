import { Stack } from "@/Components/v3/ui";
import { Button, ButtonGroup } from "@/Components/v3/ui";
import SkeletonLayout from "./skeleton.jsx";
import PropTypes from "prop-types";

const MonitorTimeFrameHeader = ({
	isLoading = false,
	hasDateRange = true,
	dateRange,
	setDateRange,
}) => {

	if (isLoading) {
		return <SkeletonLayout />;
	}

	let timeFramePicker = null;

	if (hasDateRange) {
		timeFramePicker = (
			<ButtonGroup className="h-8">
				<Button
					variant="group"
					filled={(dateRange === "recent").toString()}
					onClick={() => setDateRange("recent")}
				>
					Recent
				</Button>
				<Button
					variant="group"
					filled={(dateRange === "day").toString()}
					onClick={() => setDateRange("day")}
				>
					Day
				</Button>
				<Button
					variant="group"
					filled={(dateRange === "week").toString()}
					onClick={() => setDateRange("week")}
				>
					Week
				</Button>
				<Button
					variant="group"
					filled={(dateRange === "month").toString()}
					onClick={() => setDateRange("month")}
				>
					Month
				</Button>
			</ButtonGroup>
		);
	}

	return (
		<Stack
			direction="row"
			justifyContent="flex-end"
			alignItems="center"
			gap="[var(--spacing-4)]"
		>
			<p className="text-sm">
				Showing statistics for past{" "}
				{dateRange === "recent"
					? "2 hours"
					: dateRange === "day"
						? "24 hours"
						: dateRange === "week"
							? "7 days"
							: "30 days"}
				.
			</p>
			{timeFramePicker}
		</Stack>
	);
};

MonitorTimeFrameHeader.propTypes = {
	isLoading: PropTypes.bool,
	hasDateRange: PropTypes.bool,
	dateRange: PropTypes.string,
	setDateRange: PropTypes.func,
};

export default MonitorTimeFrameHeader;
