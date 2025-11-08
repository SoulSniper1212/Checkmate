import { Tooltip } from "@/Components/v3/ui";
import { ListItemButton, ListItemIcon } from "@/Components/v3/ui";
import { Box } from "@/Components/v3/ui";
import { Typography } from "@/Components/v3/ui";
import PropTypes from "prop-types";

const NavItem = ({ item, collapsed, selected, onClick }) => {
	const iconStroke = selected
		? "var(--color-primary-contrast-text)"
		: "var(--color-primary-contrast-text-tertiary)";

	const buttonBgColor = selected ? "var(--color-secondary-main)" : "transparent";
	const buttonBgHoverColor = selected
		? "var(--color-secondary-main)"
		: "var(--color-tertiary-main)";
	const fontWeight = selected ? 600 : 400;
	return (
		<Tooltip
			placement="right"
			title={collapsed ? item.name : ""}
			disableInteractive
		>
			<ListItemButton
				className="bg-[--button-bg-color] hover:bg-[--button-bg-hover-color] h-[37px] gap-[var(--spacing-4)] rounded-[var(--border-radius)] px-[var(--spacing-4)] pl-[var(--spacing-5)]"
				style={{
					'--button-bg-color': buttonBgColor,
					'--button-bg-hover-color': buttonBgHoverColor
				}}
				onClick={onClick}
			>
				<ListItemIcon
					className="min-w-0 [&_svg]:h-[20px] [&_svg]:w-[20px] [&_svg]:opacity-[0.81] [&_svg_path]:stroke-[--icon-stroke]"
					style={{ '--icon-stroke': iconStroke }}
				>
					{item.icon}
				</ListItemIcon>
				<Box
					className="overflow-hidden transition-opacity duration-900 ease-in-out [--collapsed-opacity:0] opacity-[var(--collapsed-opacity)] whitespace-nowrap"
					style={{ '--collapsed-opacity': collapsed ? 0 : 1 }}
				>
					<Typography
						variant="body1"
						color="var(--color-primary-contrast-text)"
						className="font-[--font-weight] opacity-[0.9]"
						style={{ '--font-weight': fontWeight }}
					>
						{item.name}
					</Typography>
				</Box>
			</ListItemButton>
		</Tooltip>
	);
};

NavItem.propTypes = {
	item: PropTypes.object,
	collapsed: PropTypes.bool,
	selected: PropTypes.bool,
	onClick: PropTypes.func,
};
export default NavItem;
