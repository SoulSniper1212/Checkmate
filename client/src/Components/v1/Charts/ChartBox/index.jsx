import { Stack, Typography } from "@/Components/v3/ui";
import IconBox from "../../IconBox/index.jsx";
import EmptyView from "./EmptyView.jsx";
import PropTypes from "prop-types";

const ChartBox = ({
	children,
	icon,
	header,
	height = "300px",
	justifyContent = "space-between",
	Legend,
	borderRadiusRight = 4,
	sx,
	noDataMessage,
	isEmpty = false,
}) => {
	if (isEmpty) {
		return (
			<EmptyView
				icon={icon}
				header={header}
				message={noDataMessage}
			/>
		);
	}
	return (
		<Stack
			flex={1}
			direction="row"
			className="bg-slate-900 border border-slate-700 rounded-t-sm rounded-r-sm"
		>
			<Stack
				flex={1}
				className="p-8 justify-between gap-8"
				style={{
					height,
					minWidth: 250,
				}}
			>
				<style jsx>{`
					:global(.chart-box h2) {
						color: #94a3b8;
						font-size: 15px;
						font-weight: 500;
					}
					:global(.chart-box :not(.area-tooltip) p) {
						color: #64748b;
						font-size: 13px;
					}
					:global(.chart-box > span) {
						color: #f1f5f9;
						font-size: 20px;
					}
					:global(.chart-box > span span) {
						opacity: 0.8;
						margin-left: 2px;
						font-size: 15px;
					}
					:global(.chart-box tspan),
					:global(.chart-box text) {
						fill: #64748b;
					}
					:global(.chart-box path) {
						transition: fill 300ms ease, stroke-width 400ms ease;
					}
				`}</style>
				<Stack
					alignSelf="flex-start"
					direction="row"
					alignItems="center"
					gap="24px"
					className="chart-box"
				>
					{icon && <IconBox>{icon}</IconBox>}
					{header && <Typography component="h2">{header}</Typography>}
				</Stack>
				{children}
			</Stack>
			{Legend && Legend}
		</Stack>
	);
};

export default ChartBox;

ChartBox.propTypes = {
	children: PropTypes.node,
	icon: PropTypes.node,
	header: PropTypes.string,
	height: PropTypes.string,
	noDataMessage: PropTypes.string,
	isEmpty: PropTypes.bool,
};
