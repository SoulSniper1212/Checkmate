import { Stack, Typography } from "@/Components/v3/ui";
import IconBox from "../../IconBox/index.jsx";
import PropTypes from "prop-types";

const LegendBox = ({ children, icon, header, sx }) => {
	return (
		<Stack
			direction="column"
			gap="16px"
			borderRadius="32px"
			className="pl-6 border-l border-slate-700 bg-slate-900 p-8"
			style={{
				background: "linear-gradient(325deg, #1e293b 20%, #0f172a 45%)",
				...sx,
			}}
		>
			<Stack
				direction="row"
				gap="24px"
			>
				<IconBox>{icon}</IconBox>
				<Typography component="h2">{header}</Typography>
			</Stack>
			{children}
		</Stack>
	);
};

LegendBox.propTypes = {
	children: PropTypes.node,
	icon: PropTypes.node,
	header: PropTypes.string,
};

export default LegendBox;
