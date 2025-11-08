import { IconButton } from "@/Components/v3/ui";
import { ArrowRight } from "@/Components/v2/Arrows/ArrowRight";
import { ArrowLeft } from "@/Components/v2/Arrows/ArrowLeft";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../../../Features/UI/uiSlice.js";

export const CollapseButton = ({ collapsed }: { collapsed: boolean }) => {
	const dispatch = useDispatch();
	const arrowIcon = collapsed ? (
		<ArrowRight
			height="32px"
			width="32px"
			color="currentColor"
		/>
	) : (
		<ArrowLeft
			height="32px"
			width="32px"
			color="currentColor"
		/>
	);

	return (
		<IconButton
			size="icon"
			className="absolute top-[60px] right-0 translate-x-1/2 bg-background border border-border p-2.5 hover:bg-accent hover:border-accent focus:outline-none"
			onClick={() => {
				dispatch(toggleSidebar());
			}}
		>
			{arrowIcon}
		</IconButton>
	);
};
