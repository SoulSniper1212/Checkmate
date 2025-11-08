import { Grid } from "@/Components/v3/ui";
import Card from "../Card/index.jsx";

const MonitorGrid = ({ shouldRender, monitors }) => {
	return (
		<Grid
			className="grid gap-[var(--spacing-12)]"
		>
			{monitors?.map((monitor) => (
				<Card
					monitor={monitor}
					key={monitor._id}
				/>
			))}
		</Grid>
	);
};

export default MonitorGrid;
