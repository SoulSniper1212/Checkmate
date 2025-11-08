// Components
import { IconButton, Menu, MenuItem } from "@/Components/v3/ui";
import Settings from "../../../assets/icons/settings-bold.svg?react";
import Dialog from "../Dialog/index.jsx";

// Utils
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createToast } from "../../../Utils/toastUtils.jsx";

import PropTypes from "prop-types";
import { usePauseMonitor, useDeleteMonitor } from "../../../Hooks/v1/monitorHooks.js";

const ActionsMenu = ({
	monitor,
	isAdmin,
	updateRowCallback,
	pauseCallback,
	setIsLoading = () => {},
}) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [actions, setActions] = useState({});
	const [isOpen, setIsOpen] = useState(false);
	const [pauseMonitor, isPausing, error] = usePauseMonitor();
	const [deleteMonitor, isDeleting] = useDeleteMonitor();

	const handleRemove = async (event) => {
		event.preventDefault();
		event.stopPropagation();
		let monitor = { _id: actions.id };
		await deleteMonitor({ monitor });
		updateRowCallback();
	};

	const handlePause = async () => {
		try {
			setIsLoading(true);
			await pauseMonitor({ monitorId: monitor._id });
			pauseCallback();
		} catch (error) {
			createToast({ body: "Failed to pause monitor." });
		} finally {
			setIsLoading(false);
		}
	};

	const openMenu = (event, id, url) => {
		event.preventDefault();
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
		setActions({ id: id, url: url });
	};

	const openRemove = (e) => {
		closeMenu(e);
		setIsOpen(true);
	};

	const closeMenu = (e) => {
		e.stopPropagation();
		setAnchorEl(null);
	};

	const navigate = useNavigate();
	return (
		<>
			<IconButton
				aria-label="monitor actions"
				onClick={(event) => {
					event.stopPropagation();
					openMenu(event, monitor._id, monitor.type === "ping" ? null : monitor.url);
				}}
				className="focus:outline-none [&_svg_path]:stroke-gray-500"
			>
				<Settings />
			</IconButton>

			<Menu
				className="actions-menu [&_ul]:p-2.5 [&_ul]:bg-white [&_li]:m-0 [&_li]:text-gray-700"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={(e) => closeMenu(e)}
				disableScrollLock
			>
				{actions.url !== null ? (
					<MenuItem
						onClick={(e) => {
							closeMenu(e);
							e.stopPropagation();
							window.open(actions.url, "_blank", "noreferrer");
						}}
					>
						Open site
					</MenuItem>
				) : (
					""
				)}
				<MenuItem
					onClick={(e) => {
						e.stopPropagation();
						navigate(`/uptime/${actions.id}`);
					}}
				>
					Details
				</MenuItem>
				{/* TODO - pass monitor id to Incidents page */}
				<MenuItem
					onClick={(e) => {
						e.stopPropagation();
						navigate(`/incidents/${actions.id}`);
					}}
				>
					Incidents
				</MenuItem>
				{isAdmin && (
					<MenuItem
						onClick={(e) => {
							e.stopPropagation();

							navigate(`/uptime/configure/${actions.id}`);
						}}
					>
						Configure
					</MenuItem>
				)}
				{isAdmin && (
					<MenuItem
						onClick={(e) => {
							e.stopPropagation();
							navigate(`/uptime/create/${actions.id}`);
						}}
					>
						Clone
					</MenuItem>
				)}
				{isAdmin && (
					<MenuItem
						onClick={(e) => {
							closeMenu(e);

							e.stopPropagation();
							handlePause(e);
						}}
					>
						{monitor?.isActive === true ? "Pause" : "Resume"}
					</MenuItem>
				)}
				{isAdmin && (
					<MenuItem
						onClick={(e) => {
							e.stopPropagation();
							openRemove(e);
						}}
						className="text-red-600"
					>
						Remove
					</MenuItem>
				)}
			</Menu>
			<Dialog
				open={isOpen}
				title="Do you really want to delete this monitor?"
				description="Once deleted, this monitor cannot be retrieved."
				/* Do we need stop propagation? */
				onCancel={(e) => {
					e.stopPropagation();
					setIsOpen(false);
				}}
				confirmationButtonLabel="Delete"
				/* Do we need stop propagation? */
				onConfirm={(e) => {
					e.stopPropagation();
					handleRemove(e);
				}}
				isLoading={isDeleting}
				modelTitle="modal-delete-monitor"
				modelDescription="delete-monitor-confirmation"
			/>
		</>
	);
};

ActionsMenu.propTypes = {
	monitor: PropTypes.shape({
		_id: PropTypes.string,
		url: PropTypes.string,
		type: PropTypes.string,
		isActive: PropTypes.bool,
	}).isRequired,
	isAdmin: PropTypes.bool,
	updateRowCallback: PropTypes.func,
	pauseCallback: PropTypes.func,
	setIsLoading: PropTypes.func,
};

export default ActionsMenu;
