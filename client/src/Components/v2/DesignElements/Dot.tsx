export const Dot = ({
	color = "hsl(var(--muted-foreground))",
	size = "4px",
	style,
}: {
	color?: string;
	size?: string;
	style?: React.CSSProperties;
}) => {
	return (
		<span
			className="inline-block rounded-full opacity-80"
			style={{
				width: size,
				height: size,
				backgroundColor: color,
				...style,
			}}
		/>
	);
};
