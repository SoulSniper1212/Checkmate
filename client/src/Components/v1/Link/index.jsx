import { Link as RouterLink } from "react-router-dom";
import { Link } from "@/Components/v3/ui";
import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

/**
 * @component
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'tertiary' | 'error'} props.level - The level of the link
 * @param {string} props.label - The label of the link
 * @param {string} props.url - The URL of the link
 * @returns {JSX.Element}
 */

const LinkComponent = ({ level, label, url, external = true, className }) => {
	const levelConfig = {
		primary: {
			className: "text-muted-foreground hover:text-foreground transition-colors w-fit",
		},
		secondary: {
			className: "text-foreground/80 hover:text-foreground transition-colors w-fit",
		},
		tertiary: {
			className: "text-muted-foreground underline underline-dashed underline-offset-1 hover:bg-accent hover:text-muted-foreground transition-colors w-fit",
		},
		error: {
			className: "text-destructive hover:text-destructive/80 transition-colors w-fit",
		},
	};

	const config = levelConfig[level] || levelConfig.primary;

	if (external) {
		return (
			<Link
				href={url}
				target="_blank"
				rel="noreferrer"
				className={cn(config.className, className)}
			>
				{label}
			</Link>
		);
	}

	return (
		<Link
			as={RouterLink}
			to={url}
			className={cn(config.className, className)}
		>
			{label}
		</Link>
	);
};

LinkComponent.propTypes = {
	url: PropTypes.string.isRequired,
	level: PropTypes.oneOf(["primary", "secondary", "tertiary", "error"]),
	label: PropTypes.string.isRequired,
	external: PropTypes.bool,
	className: PropTypes.string,
};

export default LinkComponent;
