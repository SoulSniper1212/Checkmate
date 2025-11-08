import { Stack, Skeleton } from "@/Components/v3/ui";
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";

const SkeletonLayout = () => {
	const theme = useTheme();

	return (
		<Stack
			direction="row"
			gap={theme.spacing(8)}
		>
			{Array.from({ length: 3 }).map((_, idx) => {
				return (
					<Skeleton
						key={`gauge-${idx}`}
						variant="rectangular"
						width={200}
						height={200}
					/>
				);
			})}
		</Stack>
	);
};

export default SkeletonLayout;
