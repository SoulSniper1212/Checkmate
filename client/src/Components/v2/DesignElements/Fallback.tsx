import { Stack, Typography, Box } from "@/Components/v3/ui";
import OutputAnimation from "@/assets/Animations/output.gif";
import DarkmodeOutput from "@/assets/Animations/darkmodeOutput.gif";
import { BulletPointCheck } from "@/Components/v2/DesignElements";
import { Button } from "@/Components/v2/Inputs";

import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

interface BaseFallbackProps extends BoxProps {
	children: React.ReactNode;
}

export const BaseFallback: React.FC<BaseFallbackProps> = ({ children, ...props }) => {
	const mode = useSelector((state: any) => state.ui.mode);

	return (
		<Box
			className="mx-auto mt-auto md:mt-auto md:mx-auto w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%] p-16 relative border-2 border-border border-dashed rounded-lg overflow-hidden bg-background"
			{...props}
		>
			<Stack
				className="items-center gap-20 w-fit mx-auto mt-[100px]"
			>
				<img
					src={mode === "light" ? OutputAnimation : DarkmodeOutput}
					className="bg-transparent w-full border-none rounded-lg z-10"
					alt="Loading animation"
				/>

				<Stack
					className="gap-4 items-center max-w-[300px] z-10"
				>
					{children}
				</Stack>
			</Stack>
		</Box>
	);
};

export const ErrorFallback = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => {
	return (
		<BaseFallback>
			<Typography
				variant="h1"
				className="my-4 text-muted-foreground"
			>
				{title}
			</Typography>
			<Typography>{subtitle}</Typography>
		</BaseFallback>
	);
};

export const EmptyFallback = ({
	page,
	title,
	bullets,
	actionButtonText,
	actionLink,
}: {
	page: string;
	title: string;
	bullets: any;
	actionButtonText: string;
	actionLink: string;
}) => {
	const navigate = useNavigate();
	return (
		<BaseFallback>
			<Stack
				className="gap-10 z-10 items-center"
			>
				<Typography
					component="h1"
					className="text-foreground"
				>
					{title}
				</Typography>
				<Stack
					className="flex-wrap gap-2 w-[90%] md:w-[80%] lg:w-[75%] max-w-full"
				>
					{bullets?.map((bullet: string, index: number) => (
						<BulletPointCheck
							text={bullet}
							key={`${(page + "Monitors").trim().split(" ")[0]}-${index}`}
						/>
					))}
				</Stack>
				<Stack>
					<Button
						muiVariant="contained"
						color="primary"
						onClick={() => navigate(actionLink)}
					>
						{actionButtonText}
					</Button>
				</Stack>
			</Stack>
		</BaseFallback>
	);
};
