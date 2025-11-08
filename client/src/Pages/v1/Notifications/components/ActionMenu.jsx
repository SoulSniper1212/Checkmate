// Components
import { Menu, IconButton, MenuItem } from "@/Components/v3/ui";
import { Settings } from "lucide-react";

// Utils
import { useState } from "react";
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const ActionMenu = ({ notification, onDelete }) => {
	const theme = useTheme();
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const { t } = useTranslation();
	// Handlers
	const handleClick = (event) => {
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (event) => {
		if (event) {
			event.stopPropagation();
		}
		setAnchorEl(null);
	};

	const handleRemove = (e) => {
		e.stopPropagation();
		onDelete(notification._id);
		handleClose();
	};

	const handleConfigure = (e) => {
		e.stopPropagation();
		navigate(`/notifications/${notification._id}`);
		handleClose();
	};

	return (
		<>
			<IconButton
				aria-label="notification actions"
				onClick={handleClick}
				onMouseDown={(e) => e.stopPropagation()}
			>
				<Settings />
			</IconButton>

			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				onClick={(e) => e.stopPropagation()}
				onMouseDown={(e) => e.stopPropagation()}
			>
				<MenuItem onClick={handleConfigure}>{t("configure")}</MenuItem>
				<MenuItem
					onClick={handleRemove}
					sx={{ "&.MuiButtonBase-root": { color: theme.palette.error.main } }}
				>
					{t("delete")}
				</MenuItem>
			</Menu>
		</>
	);
};

ActionMenu.propTypes = {
	notification: PropTypes.object,
	onDelete: PropTypes.func,
};

export default ActionMenu;
