import { Box } from "@/Components/v3/ui";
import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

/**
 * IconBox - A styled box component for rendering icons with consistent sizing and styling
 *
 * @component
 * @param {Object} [props] - Configuration options for the IconBox
 * @param {number} [props.height=34] - Height of the icon box
 * @param {number} [props.width=34] - Width of the icon box
 * @param {number} [props.minWidth=34] - Minimum width of the icon box
 * @param {number} [props.borderRadius=4] - Border radius of the icon box
 * @param {number} [props.svgWidth=20] - Width of the SVG icon
 * @param {number} [props.svgHeight=20] - Height of the SVG icon
 *
 * @example
 * // Basic usage
 * <IconBox>
 *   <SomeIcon />
 * </IconBox>
 *
 * @example
 * // Customized usage
 * <IconBox
 *   height={40}
 *   width={40}
 *   svgWidth={24}
 *   svgHeight={24}
 * >
 *   <CustomIcon />
 * </IconBox>
 *
 * @returns {React.ReactElement} A styled box containing an icon
 */
const IconBox = ({
	children,
	className,
	height = 34,
	width = 34,
	minWidth = 34,
	borderRadius = 4,
	svgWidth = 20,
	svgHeight = 20,
	...props
}) => {
	return (
		<Box
			className={cn(
				"relative border bg-secondary",
				className
			)}
			style={{
				height: `${height}px`,
				minWidth: `${minWidth}px`,
				width: `${width}px`,
				borderRadius: `${borderRadius}px`,
			}}
			{...props}
		>
			{children && (
				<div
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: `${svgWidth}px`,
						height: `${svgHeight}px`,
					}}
					className="text-muted-foreground"
				>
					{children}
				</div>
			)}
		</Box>
	);
};

IconBox.propTypes = {
	height: PropTypes.number,
	width: PropTypes.number,
	minWidth: PropTypes.number,
	borderRadius: PropTypes.number,
	svgWidth: PropTypes.number,
	svgHeight: PropTypes.number,
	children: PropTypes.node,
	className: PropTypes.string,
};

export default IconBox;
