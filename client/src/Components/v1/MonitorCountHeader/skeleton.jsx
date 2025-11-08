import { Stack, Skeleton } from "@/Components/v3/ui";
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";

const SkeletonLayout = () => {
	const theme = useTheme();
	return (
		<Stack
			direction="row"
			alignItems="center"
			gap={theme.spacing(2)}
		>
			<Skeleton
				variant="text"
				width={100}
				height={32}
			/>
			<Skeleton
				variant="circular"
				width={40}
				height={40}
			/>
		</Stack>
	);
};

export default SkeletonLayout;
