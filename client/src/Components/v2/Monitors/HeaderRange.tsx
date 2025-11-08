import { Stack, Typography } from "@/Components/v3/ui";
import { ButtonGroup, Button } from "@/Components/v2/Inputs";
export const HeaderRange = ({
	range,
	setRange,
	loading,
}: {
	range: string;
	setRange: Function;
	loading: boolean;
}) => {
	return (
		<Stack
			gap={9}
			direction="col md:row"
			alignItems={"center"}
			justifyContent="flex-end"
		>
			<Typography variant="body2">{`Showing statistics for past ${range}`}</Typography>
			<ButtonGroup
				orientation="vertical md:horizontal"
				fullWidth="md"
				variant="contained"
				color={"primary"}
			>
				<Button
					color={range === "2h" ? "secondary" : "inherit"}
					onClick={() => setRange("2h")}
					loading={loading}
				>
					Recent
				</Button>
				<Button
					color={range === "24h" ? "secondary" : "inherit"}
					onClick={() => setRange("24h")}
					loading={loading}
				>
					Day
				</Button>
				<Button
					color={range === "7d" ? "secondary" : "inherit"}
					onClick={() => setRange("7d")}
					loading={loading}
				>
					7 days
				</Button>
				<Button
					color={range === "30d" ? "secondary" : "inherit"}
					onClick={() => setRange("30d")}
					loading={loading}
				>
					30 days
				</Button>
			</ButtonGroup>
		</Stack>
	);
};
