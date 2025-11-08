import { Stack, Box, Typography } from "@/Components/v3/ui";
import Logo from "@/assets/icons/checkmate-icon.svg?react";

interface AuthBasePageProps extends React.HTMLAttributes<HTMLDivElement> {
	title?: string;
	subtitle?: string;
	children: React.ReactNode;
}

export const AuthBasePage: React.FC<AuthBasePageProps> = ({
	children,
	title,
	subtitle,
	...props
}) => {
	return (
		<Stack
			gap={10}
			className="min-h-screen"
			{...props}
		>
			<Stack
				className="items-center mx-auto w-full"
				gap={4}
			>
				<Box
					className="w-16 sm:w-20 md:w-24 mb-10"
				>
					<Logo style={{ width: "100%", height: "100%" }} />
				</Box>
				<Typography variant="h1">{title}</Typography>
				<Typography variant="h1">{subtitle}</Typography>
				{children}
			</Stack>
		</Stack>
	);
};
