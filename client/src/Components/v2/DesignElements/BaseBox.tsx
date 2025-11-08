import { Box } from "@/Components/v3/ui";

type BaseBoxProps = React.PropsWithChildren<{ className?: string }>;

export const BaseBox: React.FC<BaseBoxProps> = ({ children, className }) => {
	return (
		<Box
			className={`bg-background border border-border rounded-lg ${className || ""}`}
		>
			{children}
		</Box>
	);
};
