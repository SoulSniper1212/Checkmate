import { Stack, Typography } from "@/Components/v3/ui";
import CheckOutlined from "@/assets/icons/check-outlined.svg?react";

export const BulletPointCheck = ({
	text,
	variant = "info",
}: {
	text: string;
	noHighlightText?: string;
	variant?: "success" | "error" | "info";
}) => {
	const getColorClasses = (variant: string) => {
		switch (variant) {
			case "success":
				return "text-success";
			case "error":
				return "text-destructive";
			case "info":
			default:
				return "text-muted-foreground";
		}
	};

	return (
		<Stack
			direction="row"
			className="check items-center gap-6"
		>
			<CheckOutlined />
			<Typography
				component="span"
				className={`${getColorClasses(variant)} opacity-90 font-medium`}
			>
				{text}
			</Typography>
		</Stack>
	);
};
