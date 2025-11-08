import { Stack, Typography } from "@/Components/v3/ui";
import PropTypes from "prop-types";

const ToastBody = ({ body }) => {
	if (Array.isArray(body)) {
		return (
			<Stack gap={2}>
				{body.map((item, idx) => (
					<Typography
						key={`item-${idx}`}
						className="text-secondary-foreground"
					>
						{item}
					</Typography>
				))}
			</Stack>
		);
	} else if (typeof body === "string") {
		return <Typography className="text-secondary-foreground">{body}</Typography>;
	}

	return null;
};

ToastBody.propTypes = {
	body: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

export default ToastBody;
