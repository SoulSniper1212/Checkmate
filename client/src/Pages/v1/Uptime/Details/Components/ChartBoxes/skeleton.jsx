import { Skeleton, Stack } from "@/Components/v3/ui";
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";

const SkeletonLayout = () => {
	const theme = useTheme();
	return (
		<Stack
			direction="row"
			gap={theme.spacing(8)}
		>
			<Skeleton
				variant="rounded"
				width="100%"
				height={300}
			/>
			<Skeleton
				variant="rounded"
				width="100%"
				height={300}
			/>
			<Skeleton
				variant="rounded"
				width="100%"
				height={300}
			/>
		</Stack>
	);
};

export default SkeletonLayout;
