// Components
import { Card } from "@/Components/v3/ui";
import PropTypes from "prop-types";
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import IconBox from "../../IconBox/index.jsx";

/**
 * `EmptyView` is a functional React component that displays an empty state view with an optional icon, header, and message.
 *
 * @component
 * @param {Object} props - The properties that define the `EmptyView` component.
 * @param {React.ReactNode} [props.icon] - An optional icon to display at the top of the empty view.
 * @param {string} [props.header] - An optional header text displayed next to the icon.
 * @param {string} [props.message="No Data"] - The message to be displayed in the empty view.
 * @param {'h1' | 'h2' | 'h3'} [props.headingLevel="h2"] - The heading level for the message text.
 * @param {string} [props.justifyContent="flex-start"] - The CSS `justify-content` value to align elements vertically.
 * @param {string} [props.height="100%"] - The height of the empty view container.
 *
 * @example
 * // Example usage of EmptyView component:
 * <EmptyView
 *   icon={<SomeIcon />}
 *   header="Average Response Time"
 *   message="No Response Time Available"
 *   headingLevel="h2"
 *   justifyContent="center"
 *   height="50%"
 * />
 *
 * @returns {React.Element} The `EmptyView` component with customizable icon, header, and message.
 */

const EmptyView = ({
	icon,
	header,
	message = "No Data",
	headingLevel = "h2",
	justifyContent = "flex-start",
	height = "100%",
}) => {
	return (
		<Card className="flex-1 flex-row bg-[var(--color-primary-main)] border border-solid border-[var(--color-primary-low-contrast)] rounded-[2px] rounded-tr-[4px] rounded-br-[4px)]">
			<div
				className="flex-1 items-center p-[var(--spacing-8)] gap-[var(--spacing-8)]"
				style={{ justifyContent, height }}
			>
				<div className="self-start flex-row items-center gap-[var(--spacing-6)] flex">
					{icon && <IconBox>{icon}</IconBox>}
					{header && <h2 className="text-[15px] font-medium text-[var(--color-primary-contrast-text-secondary)]">{header}</h2>}
				</div>
				<div className="flex-1 justify-center items-center flex">
					{headingLevel === "h1" ? (
						<h1 className="text-[var(--color-primary-contrast-text-tertiary)]">{message}</h1>
					) : headingLevel === "h2" ? (
						<h2 className="text-[var(--color-primary-contrast-text-tertiary)]">{message}</h2>
					) : (
						<h3 className="text-[var(--color-primary-contrast-text-tertiary)]">{message}</h3>
					)}
				</div>
			</div>
		</Card>
	);
};

EmptyView.propTypes = {
	message: PropTypes.string,
	icon: PropTypes.node,
	header: PropTypes.string,
	headingLevel: PropTypes.oneOf(["h1", "h2", "h3"]),
	justifyContent: PropTypes.string,
	height: PropTypes.string,
};

export default EmptyView;
