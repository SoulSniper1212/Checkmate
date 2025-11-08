import { useState, useMemo, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import {
	Dialog,
	DialogContent,
	DialogActions,
	Button,
	Typography,
	Box,
	Tabs,
	Tab,
	Stack,
} from "@/Components/v3/ui";
import TabPanel from "./TabPanel.jsx";
import TabComponent from "./TabComponent.jsx";
import useNotifications from "../Hooks/useNotification.js";

// Define constants for notification types to avoid magic values
const NOTIFICATION_TYPES = {
	SLACK: "slack",
	DISCORD: "discord",
	TELEGRAM: "telegram",
	WEBHOOK: "webhook",
};

// Define constants for field IDs
const FIELD_IDS = {
	WEBHOOK: "webhook",
	TOKEN: "token",
	CHAT_ID: "chatId",
	URL: "url",
};

const NotificationIntegrationModal = ({
	open,
	onClose,
	monitor,
	setMonitor,
	// Optional prop to configure available notification types
	notificationTypes = null,
}) => {
	const { t } = useTranslation();
	const [tabValue, setTabValue] = useState(0);

	const [loading, _, sendTestNotification] = useNotifications();

	// Helper to get the field state key with error handling
	const getFieldKey = useCallback(
		(typeId, fieldId) => {
			if (typeof typeId !== "string" || typeId === "") {
				throw new Error(t("errorInvalidTypeId"));
			}

			if (typeof fieldId !== "string" || fieldId === "") {
				throw new Error(t("errorInvalidFieldId"));
			}

			return `${typeId}${fieldId.charAt(0).toUpperCase() + fieldId.slice(1)}`;
		},
		[t]
	);

	// Define notification types
	const DEFAULT_NOTIFICATION_TYPES = [
		{
			id: NOTIFICATION_TYPES.SLACK,
			label: t("notifications.slack.label"),
			description: t("notifications.slack.description"),
			fields: [
				{
					id: FIELD_IDS.WEBHOOK,
					label: t("notifications.slack.webhookLabel"),
					placeholder: t("notifications.slack.webhookPlaceholder"),
					type: "text",
				},
			],
		},
		{
			id: NOTIFICATION_TYPES.DISCORD,
			label: t("notifications.discord.label"),
			description: t("notifications.discord.description"),
			fields: [
				{
					id: FIELD_IDS.WEBHOOK,
					label: t("notifications.discord.webhookLabel"),
					placeholder: t("notifications.discord.webhookPlaceholder"),
					type: "text",
				},
			],
		},
		{
			id: NOTIFICATION_TYPES.TELEGRAM,
			label: t("notifications.telegram.label"),
			description: t("notifications.telegram.description"),
			fields: [
				{
					id: FIELD_IDS.TOKEN,
					label: t("notifications.telegram.tokenLabel"),
					placeholder: t("notifications.telegram.tokenPlaceholder"),
					type: "text",
				},
				{
					id: FIELD_IDS.CHAT_ID,
					label: t("notifications.telegram.chatIdLabel"),
					placeholder: t("notifications.telegram.chatIdPlaceholder"),
					type: "text",
				},
			],
		},
		{
			id: NOTIFICATION_TYPES.WEBHOOK,
			label: t("notifications.webhook.label"),
			description: t("notifications.webhook.description"),
			fields: [
				{
					id: FIELD_IDS.URL,
					label: t("notifications.webhook.urlLabel"),
					placeholder: t("notifications.webhook.urlPlaceholder"),
					type: "text",
				},
			],
		},
	];

	// Use provided notification types or default to our translated ones
	const activeNotificationTypes = notificationTypes || DEFAULT_NOTIFICATION_TYPES;

	// Memoized function to initialize integrations state
	const initialIntegrationsState = useMemo(() => {
		const state = {};

		activeNotificationTypes.forEach((type) => {
			// Add enabled flag for each notification type
			state[type.id] = false;

			// Add state for each field in the notification type
			type.fields.forEach((field) => {
				const fieldKey = getFieldKey(type.id, field.id);
				state[fieldKey] = "";
			});
		});

		return state;
	}, [activeNotificationTypes, getFieldKey]); // Only recompute when these dependencies change

	const [integrations, setIntegrations] = useState(initialIntegrationsState);

	useEffect(() => {
		if (open) {
			const extractNotificationValues = () => {
				const values = {};

				if (!monitor?.notifications || !Array.isArray(monitor.notifications)) {
					return values;
				}

				monitor.notifications.forEach((notification) => {
					// Handle notification based on its structure
					if (notification.type === "webhook" && notification.platform) {
						if (typeof notification.config === "undefined") return;
						const platform = notification.platform;
						values[platform] = true; // Set platform as enabled

						// Extract configuration based on platform
						switch (platform) {
							case NOTIFICATION_TYPES.SLACK:
							case NOTIFICATION_TYPES.DISCORD:
								if (notification.config.webhookUrl) {
									values[getFieldKey(platform, FIELD_IDS.WEBHOOK)] =
										notification.config.webhookUrl;
								}
								break;
							case NOTIFICATION_TYPES.TELEGRAM:
								if (notification.config.botToken) {
									values[getFieldKey(platform, FIELD_IDS.TOKEN)] =
										notification.config.botToken;
								}
								if (notification.config.chatId) {
									values[getFieldKey(platform, FIELD_IDS.CHAT_ID)] =
										notification.config.chatId;
								}
								break;
							case NOTIFICATION_TYPES.WEBHOOK:
								if (notification.config.webhookUrl) {
									values[getFieldKey(platform, FIELD_IDS.URL)] =
										notification.config.webhookUrl;
								}
								break;
						}
					}
				});

				return values;
			};

			const extractedValues = extractNotificationValues();
			setIntegrations((prev) => ({
				...prev,
				...extractedValues,
			}));
		}
	}, [open, monitor, getFieldKey]);

	const handleChangeTab = (event, newValue) => {
		setTabValue(newValue);
	};

	const handleIntegrationChange = (type, checked) => {
		setIntegrations((prev) => ({
			...prev,
			[type]: checked,
		}));
	};

	const handleInputChange = (type, value) => {
		setIntegrations((prev) => ({
			...prev,
			[type]: value,
		}));
	};

	const handleTestNotification = async (type) => {
		// Get the notification type details
		const notificationType = activeNotificationTypes.find((t) => t.id === type);

		if (typeof notificationType === "undefined") {
			return;
		}

		// Prepare config object based on notification type
		const config = {};

		// Add each field value to the config object
		notificationType.fields.forEach((field) => {
			const fieldKey = getFieldKey(type, field.id);
			config[field.id] = integrations[fieldKey];
		});

		await sendTestNotification(type, config);
	};

	// In NotificationIntegrationModal.jsx, update the handleSave function:

	const handleSave = () => {
		// Get existing notifications
		const notifications = [...(monitor?.notifications || [])];

		// Get all notification types IDs
		const existingTypes = activeNotificationTypes.map((type) => type.id);

		// Filter out notifications that are configurable in this modal
		const filteredNotifications = notifications.filter((notification) => {
			if (notification.platform) {
				return !existingTypes.includes(notification.platform);
			}

			return !existingTypes.includes(notification.type);
		});

		// Add each enabled notification with its configured fields
		activeNotificationTypes.forEach((type) => {
			if (integrations[type.id]) {
				let notificationObject = {
					type: "webhook",
					platform: type.id, // Set platform to identify the specific service
					config: {},
				};

				// Configure based on notification type
				switch (type.id) {
					case "slack":
					case "discord":
						notificationObject.config.webhookUrl =
							integrations[getFieldKey(type.id, "webhook")];
						break;
					case "telegram":
						notificationObject.config.botToken =
							integrations[getFieldKey(type.id, "token")];
						notificationObject.config.chatId =
							integrations[getFieldKey(type.id, "chatId")];
						break;
					case "webhook":
						notificationObject.config.webhookUrl =
							integrations[getFieldKey(type.id, "url")];
						break;
				}

				filteredNotifications.push(notificationObject);
			}
		});

		// Update monitor with new notifications
		setMonitor((prev) => ({
			...prev,
			notifications: filteredNotifications,
		}));

		onClose();
	};

	return (
		<Dialog
			open={open}
			onClose={onClose}
			fullWidth
			maxWidth="md"
			className="[&_.MuiDialog-paper]:w-[calc(80%-var(--spacing-40))] [&_.MuiDialog-paper]:max-w-[calc(var(--breakpoint-md)-70px)]"
		>
			<DialogContent>
				<Stack
					direction="row"
					className="h-[calc(30vh-var(--spacing-20))]"
				>
					{/* Left sidebar with tabs */}
					<Box
						className="border-r border-[var(--color-primary-low-contrast)] w-[30%] max-w-[var(--spacing-120)] pr-[var(--spacing-10)]"
					>
						<Typography variant="h2">
							{t("notifications.addOrEditNotifications")}
						</Typography>

						<Tabs
							orientation="vertical"
							variant="scrollable"
							value={tabValue}
							onChange={handleChangeTab}
							aria-label="Notification tabs"
						>
							{activeNotificationTypes.map((type) => (
								<Tab
									key={type.id}
									label={type.label}
									orientation="vertical"
									disableRipple
								/>
							))}
						</Tabs>
					</Box>

					{/* Right side content */}
					<Box
						className="flex-1 pl-[var(--spacing-7-5)] overflow-y-auto"
					>
						{activeNotificationTypes.map((type, index) => (
							<TabPanel
								key={type.id}
								value={tabValue}
								index={index}
							>
								<TabComponent
									type={type}
									integrations={integrations}
									handleIntegrationChange={handleIntegrationChange}
									handleInputChange={handleInputChange}
									handleTestNotification={handleTestNotification}
									isLoading={loading}
								/>
							</TabPanel>
						))}
					</Box>
				</Stack>
			</DialogContent>
			<DialogActions
				className="p-[var(--spacing-4)] flex justify-end mb-[var(--spacing-5)] mr-[var(--spacing-5)]"
			>
				<Button
					variant="contained"
					color="accent"
					onClick={handleSave}
					loading={loading}
					className="w-auto min-w-[var(--spacing-60)] px-[var(--spacing-8)]"
				>
					{t("commonSave")}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

NotificationIntegrationModal.propTypes = {
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	monitor: PropTypes.object.isRequired,
	setMonitor: PropTypes.func.isRequired,
	notificationTypes: PropTypes.array,
};

export default NotificationIntegrationModal;
