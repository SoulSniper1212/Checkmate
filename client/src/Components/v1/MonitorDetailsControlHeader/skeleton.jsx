import { Stack, Skeleton } from "@/Components/v3/ui";

const SkeletonLayout = () => {
	return (
		<Stack
			direction="row"
			justifyContent="space-between"
		>
			<Skeleton
				height={40}
				variant="rounded"
				width="15%"
			/>
			<Skeleton
				height={40}
				variant="rounded"
				width="15%"
			/>
		</Stack>
	);
};

export default SkeletonLayout;
