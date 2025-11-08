import * as React from "react";
import { Button, ButtonGroup, MenuItem, Menu } from "@/Components/v3/ui";
import { useNavigate } from "react-router-dom";

// Simple dropdown arrow icon
const ArrowDropDownIcon = () => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
		<path d="M7 10l5 5 5-5z"/>
	</svg>
);
import { useTranslation } from "react-i18next";
import { createToast } from "../../../Utils/toastUtils.jsx";
import { useExportMonitors } from "../../../Hooks/v1/monitorHooks.js";

const MonitorActions = ({ isLoading }) => {
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);
	const [selectedIndex, setSelectedIndex] = React.useState(0);
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [exportMonitors, isExporting] = useExportMonitors();

	const options = [t("monitorActions.import"), t("monitorActions.export")];

	const handleClick = async () => {
		if (selectedIndex === 0) {
			// Import
			navigate("/uptime/bulk-import");
		} else {
			// Export
			const [success, error] = await exportMonitors();
			if (!success) {
				createToast({ body: error || t("export.failed") });
			}
		}
	};

	const handleMenuItemClick = (event, index) => {
		setSelectedIndex(index);
		setOpen(false);
	};

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}
		setOpen(false);
	};

	return (
		<React.Fragment>
			<ButtonGroup
				variant="default"
				aria-label="Monitor actions"
				disabled={isLoading || isExporting}
			>
				<Button onClick={handleClick}>{options[selectedIndex]}</Button>
				<Button
					size="small"
					aria-controls={open ? "split-button-menu" : undefined}
					aria-expanded={open ? "true" : undefined}
					aria-label="select monitor action"
					aria-haspopup="menu"
					onClick={handleToggle}
				>
					<ArrowDropDownIcon />
				</Button>
			</ButtonGroup>
			<Menu
				open={open}
				onClose={handleClose}
				anchorEl={anchorRef.current}
			>
				{options.map((option, index) => (
					<MenuItem
						key={option}
						onClick={(event) => handleMenuItemClick(event, index)}
					>
						{option}
					</MenuItem>
				))}
			</Menu>
		</React.Fragment>
	);
};

export default MonitorActions;
