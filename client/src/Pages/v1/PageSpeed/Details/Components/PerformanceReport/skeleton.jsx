import { Box, Skeleton } from "@/Components/v3/ui";

const SkeletonLayout = () => {
	return (
		<Box
			height={"100%"}
			width={"100%"}
		>
			<Skeleton
				height={"100%"}
				width={"100%"}
			/>
		</Box>
	);
};

export default SkeletonLayout;
