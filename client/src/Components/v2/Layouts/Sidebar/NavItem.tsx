import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/v3/ui/tooltip";
import { ListItemButton, ListItemIcon } from "@/Components/v3/ui";
import { Box } from "@/Components/v3/ui";
import { Typography } from "@/Components/v3/ui";

export interface NavData {
	name: string;
	icon: JSX.Element;
}

export const NavItem = ({
	item,
	collapsed,
	selected,
	onClick,
}: {
	item: NavData;
	collapsed: boolean;
	selected: boolean;
	onClick: (event: React.MouseEvent) => void;
}) => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={0}>
				<TooltipTrigger asChild>
					<div>
			<ListItemButton
				className={`h-[37px] gap-4 rounded-md px-5 pr-4 transition-colors hover:bg-opacity-80 ${
					selected ? 'bg-secondary text-secondary-foreground' : 'hover:bg-muted'
				}`}
				onClick={onClick}
			>
				<ListItemIcon
					className="min-w-0 [&_svg]:h-5 [&_svg]:w-5 [&_svg]:opacity-81 [&_svg_path]:stroke-muted-foreground"
				>
					{item.icon}
				</ListItemIcon>
				<Box
					className="overflow-hidden transition-all duration-900 ease-in-out whitespace-nowrap"
					style={{
						opacity: collapsed ? 0 : 1,
					}}
				>
					<Typography
						variant="body1"
						className={`text-foreground opacity-90 ${
							selected ? 'font-semibold' : 'font-normal'
						}`}
					>
						{item.name}
					</Typography>
				</Box>
			</ListItemButton>
					</div>
				</TooltipTrigger>
				{collapsed && (
					<TooltipContent side="right" sideOffset={16}>
						<p>{item.name}</p>
					</TooltipContent>
				)}
			</Tooltip>
		</TooltipProvider>
	);
};
