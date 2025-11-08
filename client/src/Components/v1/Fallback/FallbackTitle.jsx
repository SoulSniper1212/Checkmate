import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import { Typography } from "@/Components/v3/ui";
import PropTypes from "prop-types";

const FallbackTitle = ({ title }) => {
	const theme = useTheme();
	return (
		<Typography
			variant="h1"
			className="self-center my-4"
			style={{ color: theme.palette.primary.contrastText }}
		>
			{title}
		</Typography>
	);
};
FallbackTitle.propTypes = {
	title: PropTypes.string.isRequired,
};
export default FallbackTitle;
