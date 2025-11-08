import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import { Box } from "@/Components/v3/ui";
import PropTypes from "prop-types";

const FallbackContainer = ({ children, type }) => {
	const theme = useTheme();
	return (
		<Box
			border={1}
			borderColor={theme.palette.tertiary.border}
			borderRadius={theme.shape.borderRadius}
			backgroundColor={theme.palette.tertiary.background}
			overflow="hidden"
			style={{
				display: "flex",
				borderStyle: "dashed",
				height: "fit-content",
				minHeight: "60vh",
				width: "90%",
				maxWidth: "40%",
				margin: "0 auto",
				padding: `${theme.spacing(20)} ${theme.spacing(10)}`,
			}}
			className="sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%]"
		>
			<div
				className={`fallback__${type?.trim().split(" ")[0]}`}
				style={{
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
					gap: theme.spacing(20),
					width: "100%"
				}}
			>
				{children}
			</div>
		</Box>
	);
};

FallbackContainer.propTypes = {
	children: PropTypes.node,
	type: PropTypes.string,
};

export default FallbackContainer;
