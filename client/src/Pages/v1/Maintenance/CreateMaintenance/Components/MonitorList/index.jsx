// Components
import { Stack, Typography } from "@/Components/v3/ui";
import { Trash2 } from "lucide-react";
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import PropTypes from "prop-types";

const MonitorListItem = ({ monitor, onDelete }) => {
	const theme = useTheme();
	return (
		<Stack
			direction={"row"}
			alignItems={"center"}
			gap="1rem"
			width="100%"
		>
			<Typography flexGrow={1}>{monitor.name}</Typography>
			<Trash2
				className="cursor-pointer"
				onClick={() => onDelete(monitor)}
			/>
		</Stack>
	);
};

MonitorListItem.propTypes = {
	monitor: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	}).isRequired,
	onDelete: PropTypes.func.isRequired,
};

const MonitorList = ({ selectedMonitors, setSelectedMonitors }) => {
	const onDelete = (monitorToDelete) => {
		const newMonitors = selectedMonitors.filter(
			(monitor) => monitor._id !== monitorToDelete._id
		);
		setSelectedMonitors(newMonitors);
	};

	const theme = useTheme();

	return (
		<Stack
			gap="1.5rem"
			width="100%"
		>
			{selectedMonitors?.map((monitor) => (
				<MonitorListItem
					key={monitor._id}
					monitor={monitor}
					onDelete={onDelete}
				/>
			))}
		</Stack>
	);
};

MonitorList.propTypes = {
	selectedMonitors: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
		})
	).isRequired,
	setSelectedMonitors: PropTypes.func.isRequired,
};

export default MonitorList;
