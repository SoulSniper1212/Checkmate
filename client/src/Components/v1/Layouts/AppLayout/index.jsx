import { Box } from "@/Components/v3/ui";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import BackgroundSVG from "../../../../assets/Images/background.svg";

const AppLayout = ({ children }) => {
	const ui = useSelector((state) => state.ui);
	return (
		<Box
			className="min-h-screen bg-background text-foreground"
			style={{
				backgroundImage: ui?.mode === "dark" ? `url("${BackgroundSVG}")` : "none",
				backgroundSize: "100% 100%",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		>
			{children}
		</Box>
	);
};

AppLayout.propTypes = {
	children: PropTypes.node,
};

export default AppLayout;
