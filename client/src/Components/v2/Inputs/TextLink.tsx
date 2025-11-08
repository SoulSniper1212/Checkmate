import { Typography, Stack } from "@/Components/v3/ui";
import { Link as RouterLink } from "react-router-dom";

export const TextLink = ({
	text,
	linkText,
	href,
	target = "_self",
}: {
	text: string;
	linkText: string;
	href: string;
	target?: string;
}) => {
	return (
		<Stack
			direction="row"
			gap="16px"
		>
			<Typography>{text}</Typography>
			<RouterLink
				to={href}
				target={target}
				className="text-blue-600 hover:text-blue-800 underline"
			>
				{linkText}
			</RouterLink>
		</Stack>
	);
};
