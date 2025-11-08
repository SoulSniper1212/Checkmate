import { Stack, Typography } from "@/Components/v3/ui";
import PropTypes from "prop-types";

const DEFAULT_GAP = 6;
const FieldWrapper = ({
	label,
	children,
	gap,
	labelMb,
	labelFontWeight = 500,
	labelVariant = "h3",
	labelSx = {},
	sx = {},
}) => {
	return (
		<Stack
			gap={gap ?? "24px"}
			sx={sx}
		>
			{label && (
				<Typography
					component={labelVariant}
					className="text-slate-400"
					fontWeight={labelFontWeight}
					sx={{
						...(labelMb !== undefined && { mb: `${labelMb * 4}px` }),
						...labelSx,
					}}
				>
					{label}
				</Typography>
			)}
			{children}
		</Stack>
	);
};

FieldWrapper.propTypes = {
	label: PropTypes.node,
	children: PropTypes.node.isRequired,
	gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
	labelMb: PropTypes.number,
	labelFontWeight: PropTypes.number,
	labelVariant: PropTypes.string,
	labelSx: PropTypes.object,
	sx: PropTypes.object,
};

export default FieldWrapper;
