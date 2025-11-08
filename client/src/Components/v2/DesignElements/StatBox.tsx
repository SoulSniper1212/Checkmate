import { Stack, Typography } from "@/Components/v3/ui";
import { useIsSmall } from "@/hooks/useMediaQuery";
import type { PaletteKey } from "@/Utils/Theme/v2/theme";
import { BaseBox } from "@/Components/v2/DesignElements";

type GradientBox = React.PropsWithChildren<{ palette?: PaletteKey }>;

export const GradientBox: React.FC<GradientBox> = ({ children, palette }) => {
	const isSmall = useIsSmall();

	// Simplified gradients using CSS variables - these should be defined in the theme
	const bg = palette
		? `linear-gradient(to bottom right, hsl(var(--primary)) 30%, hsl(var(--primary-foreground)) 70%)`
		: `linear-gradient(340deg, hsl(var(--accent)) 10%, hsl(var(--primary)) 45%)`;

	return (
		<BaseBox
			className="p-4 sm:p-8"
			style={{
				width: isSmall
					? "calc(50% - 1rem)"
					: "calc(25% - 1.5rem)",
				background: bg,
			}}
		>
			{children}
		</BaseBox>
	);
};

type StatBoxProps = React.PropsWithChildren<{
	title: string;
	subtitle: string;
	palette?: PaletteKey;
}>;

export const StatBox: React.FC<StatBoxProps> = ({
	title,
	subtitle,
	palette,
	children,
}) => {
	return (
		<GradientBox palette={palette}>
			<Stack>
				<Typography className="text-foreground">{title}</Typography>
				<Typography className="text-foreground">{subtitle}</Typography>
				{children}
			</Stack>
		</GradientBox>
	);
};
