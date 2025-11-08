import { Stack, Box } from "@/Components/v3/ui";
export const PulseDot = ({ color }: { color: string }) => {
	return (
		<Stack
			className="w-[26px] h-[24px] items-center justify-center"
		>
			<Box
				className="w-[18px] h-[18px] relative rounded-full before:absolute before:inset-0 before:rounded-full before:bg-inherit before:animate-pulse after:absolute after:w-[7px] after:h-[7px] after:rounded-full after:bg-background after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2"
				style={{
					backgroundColor: color,
					animation: 'ripple 1.8s ease-out infinite'
				}}
			/>
		</Stack>
	);
};
