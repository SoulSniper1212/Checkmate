import { Box } from "@/Components/v3/ui";
import PropTypes from "prop-types";
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
const CircularCount = ({ count }) => {
	const theme = useTheme();
	return (
		<Box
			component="span"
			color={theme.palette.tertiary.contrastText}
			border={2}
			borderColor={theme.palette.accent.main}
			backgroundColor={theme.palette.tertiary.main}
			sx={{
				padding: ".25em .75em",
				borderRadius: "50rem",
				fontSize: "12px",
				fontWeight: 500,
			}}
		>
			{count}
		</Box>
	);
};

CircularCount.propTypes = {
	count: PropTypes.number,
};

export default CircularCount;
