import { Typography, Stack } from "@/Components/v3/ui";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";

const TextLink = ({ text, linkText, href, target = "_self" }) => {
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

TextLink.propTypes = {
	text: PropTypes.string,
	linkText: PropTypes.string,
	href: PropTypes.string,
	target: PropTypes.string,
};

export default TextLink;
