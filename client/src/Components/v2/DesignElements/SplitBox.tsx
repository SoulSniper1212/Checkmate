import { Fragment } from "react";
import { Stack, Box, Typography } from "@/Components/v3/ui";
export const SplitBox = ({
	left,
	right,
}: {
	left: React.ReactNode;
	right: React.ReactNode;
}) => {
	return (
		<Stack
			direction="col md:row"
			className="bg-background border border-border rounded-lg"
		>
			<Box
				className="p-[15px] md:flex-[0.7] border-r border-b md:border-b-0 border-border"
			>
				{left}
			</Box>
			<Box
				className="flex-1 p-[15px]"
			>
				{right}
			</Box>
		</Stack>
	);
};

export const ConfigBox = ({
	title,
	subtitle,
	rightContent,
}: {
	title: string;
	subtitle: string;
	rightContent: React.ReactNode;
}) => {
	return (
		<SplitBox
			left={
				<Fragment>
					<Typography
						component="h2"
						variant="h2"
					>
						{title}
					</Typography>
					<Typography component="p">{subtitle}</Typography>
				</Fragment>
			}
			right={rightContent}
		/>
	);
};
