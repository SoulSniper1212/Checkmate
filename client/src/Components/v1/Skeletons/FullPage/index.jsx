import { Stack, Skeleton } from "@/Components/v3/ui";

export const SkeletonLayout = () => {
	return (
		<Stack>
			<Skeleton
				variant="rectangular"
				height={"90vh"}
			/>
		</Stack>
	);
};

export default SkeletonLayout;
