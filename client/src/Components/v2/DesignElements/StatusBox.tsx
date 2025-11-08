import { Stack, Typography, Box } from "@/Components/v3/ui";
import { BaseBox } from "@/Components/v2/DesignElements";
import Background from "@/assets/Images/background-grid.svg?react";
import { useTranslation } from "react-i18next";

type StatusBoxProps = React.PropsWithChildren<{}>;

export const BGBox: React.FC<StatusBoxProps> = ({ children }) => {
	return (
		<BaseBox className="overflow-hidden relative flex-1 p-8">
			<Box
				position="absolute"
				top="-10%"
				left="5%"
			>
				<Background />
			</Box>
			{children}
		</BaseBox>
	);
};

const StatusBox = ({
	label,
	n,
	color,
}: {
	label: string;
	n: number;
	color: string | undefined;
}) => {
	return (
		<BGBox>
			<Stack gap={2}>
				<Typography
					variant={"h2"}
					className="uppercase text-muted-foreground"
				>
					{label}
				</Typography>
				<Typography
					variant="h1"
					style={{ color }}
				>
					{n}
				</Typography>
			</Stack>
		</BGBox>
	);
};

export const UpStatusBox = ({ n }: { n: number }) => {
	const { t } = useTranslation();
	return (
		<StatusBox
			label={t("monitorStatus.up")}
			n={n}
			color="hsl(var(--success))"
		/>
	);
};

export const DownStatusBox = ({ n }: { n: number }) => {
	const { t } = useTranslation();
	return (
		<StatusBox
			label={t("monitorStatus.down")}
			n={n}
			color="hsl(var(--destructive))"
		/>
	);
};

export const PausedStatusBox = ({ n }: { n: number }) => {
	const { t } = useTranslation();
	return (
		<StatusBox
			label={t("monitorStatus.paused")}
			n={n}
			color="hsl(var(--warning))"
		/>
	);
};
