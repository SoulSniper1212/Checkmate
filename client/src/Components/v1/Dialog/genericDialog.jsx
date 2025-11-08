import { useId } from "react";
import PropTypes from "prop-types";
import { Stack, Typography } from "@/Components/v3/ui";

// Custom Modal component to replace MUI Modal
const Modal = ({ open, onClose, onClick, children, "aria-labelledby": ariaLabelledBy, "aria-describedby": ariaDescribedBy }) => {
	if (!open) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center"
			style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
			onClick={onClose}
			aria-labelledby={ariaLabelledBy}
			aria-describedby={ariaDescribedBy}
		>
			<div
				onClick={onClick}
				style={{ outline: 'none' }}
			>
				{children}
			</div>
		</div>
	);
};

const GenericDialog = ({ title, description, open, onClose, children, width }) => {
	const titleId = useId();
	const descriptionId = useId();
	const ariaDescribedBy = description?.length > 0 ? descriptionId : "";
	return (
		<Modal
			aria-labelledby={titleId}
			aria-describedby={ariaDescribedBy}
			open={open}
			onClose={onClose}
			onClick={(e) => e.stopPropagation()}
		>
			<Stack
				gap="8px"
				width={width}
				className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[400px] bg-white border border-gray-200 rounded-lg shadow-2xl p-[60px] focus:outline-none"
			>
				<Typography
					id={titleId}
					component="h2"
					fontSize={16}
					className="text-gray-900 font-semibold mb-4"
				>
					{title}
				</Typography>
				{description && (
					<Typography
						id={descriptionId}
						className="text-gray-600 mb-4"
					>
						{description}
					</Typography>
				)}
				{children}
			</Stack>
		</Modal>
	);
};

GenericDialog.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
		.isRequired,
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
};

export { GenericDialog };
