import { Box } from "@/Components/v3/ui";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
/**
 * @component
 * @param {Object} props
 * @param {string} props.src - Path to image for avatar
 * @param {boolean} props.small - Specifies if avatar should be large
 * @param {Object} [props.sx] - Additional styles to apply to the button.
 * @returns {JSX.Element}
 * @example
 * // Render a red label
 * <Avatar src="assets/img" first="Alex" last="Holliday" small />
 */

const Avatar = ({ src, small, sx, onClick = () => {} }) => {
	const { user } = useSelector((state) => state.auth);

	const size = small ? 32 : 64;
	const border = small ? 1 : 3;
	const fontSize = small ? "16px" : "22px";

	const [image, setImage] = useState();
	useEffect(() => {
		if (user.avatarImage) {
			setImage(`data:image/png;base64,${user.avatarImage}`);
		}
	}, [user?.avatarImage]);

	const avatarStyle = {
		width: size,
		height: size,
		fontSize: fontSize,
		fontWeight: 400,
		color: "white",
		backgroundColor: "#3b82f6", // Blue color for avatar background
		display: "inline-flex",
		position: "relative",
		border: `${border}px solid rgba(255,255,255,0.2)`,
		borderRadius: "50%",
		...sx,
	};

	return (
		<div
			onClick={onClick}
			style={avatarStyle}
			className="flex items-center justify-center cursor-pointer"
			alt={`${user?.firstName} ${user?.lastName}`}
		>
			{src ? (
				<img
					src={src}
					alt={`${user?.firstName} ${user?.lastName}`}
					className="w-full h-full rounded-full object-cover"
				/>
			) : user?.avatarImage ? (
				<img
					src={image}
					alt={`${user?.firstName} ${user?.lastName}`}
					className="w-full h-full rounded-full object-cover"
				/>
			) : (
				<>
					{user.firstName?.charAt(0)}
					{user.lastName?.charAt(0) || ""}
				</>
			)}
		</div>
	);
};

Avatar.propTypes = {
	src: PropTypes.string,
	small: PropTypes.bool,
	sx: PropTypes.object,
	onClick: PropTypes.func,
};

export default Avatar;
