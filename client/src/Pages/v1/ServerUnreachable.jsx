import React, { useState } from "react";
import { Box, Typography, Button, Stack } from "@/Components/v3/ui";
import { useNavigate } from "react-router-dom";
import { networkService } from "../../Utils/NetworkService.js";
import Alert from "@/Components/v1/Alert/index.jsx";
import { createToast } from "../../Utils/toastUtils.jsx";
import { useTranslation } from "react-i18next";
import Background from "../../assets/Images/background-grid.svg?react";
import Logo from "../../assets/icons/checkmate-icon.svg?react";
import ThemeSwitch from "@/Components/v1/ThemeSwitch/index.jsx";
import LanguageSelector from "../../Components/LanguageSelector.jsx";

const ServerUnreachable = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	// State for tracking connection check status
	const [isCheckingConnection, setIsCheckingConnection] = useState(false);

	const handleRetry = React.useCallback(async () => {
		setIsCheckingConnection(true);
		try {
			// Try to connect to the backend with a simple API call
			// We'll use any lightweight endpoint that doesn't require authentication
			await networkService.axiosInstance.get("/health", { timeout: 5000 });

			// If successful, show toast and navigate to login page
			createToast({
				body: t("errorPages.serverUnreachable.toasts.reconnected"),
			});
			navigate("/login");
		} catch (error) {
			// If still unreachable, stay on this page and show toast
			createToast({
				body: t("errorPages.serverUnreachable.toasts.stillUnreachable"),
			});
		} finally {
			setIsCheckingConnection(false);
		}
	}, [navigate, t]);

	return (
		<Stack
			className="login-page auth"
			overflow="hidden"
		>
			<Box
				className="background-pattern-svg"
			>
				<Background style={{ width: "100%" }} />
			</Box>

			{/* Header with logo */}
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				px="48px"
				gap="16px"
			>
				<Stack
					direction="row"
					alignItems="center"
					gap="16px"
				>
					<Logo style={{ borderRadius: "8px" }} />
					<Typography className="select-none">{t("common.appName")}</Typography>
				</Stack>
				<Stack
					direction="row"
					spacing="8px"
					alignItems="center"
				>
					<LanguageSelector />
					<ThemeSwitch />
				</Stack>
			</Stack>
			<Stack
				width="100%"
				maxWidth="600px"
				flex={1}
				justifyContent="center"
				px={{ xs: "48px", lg: "80px" }}
				pb="80px"
				mx="auto"
				rowGap="32px"
				className="border border-gray-300 rounded-[20px] bg-white p-12 xs:p-20"
			>
				<Stack
					spacing="24px"
					alignItems="center"
				>
					<Box
						className="w-full max-w-[880px] mx-auto"
					>
						<Alert
							variant="error"
							body={t("errorPages.serverUnreachable.alertBox")}
							hasIcon={true}
						/>
					</Box>
					<Box className="mt-2">
						<Typography
							variant="body1"
							align="center"
							className="text-gray-600"
						>
							{t("errorPages.serverUnreachable.description")}
						</Typography>
					</Box>
					<Box className="mt-4">
						<Button
							variant="default"
							onClick={handleRetry}
							disabled={isCheckingConnection}
							className="dashboard-style-button px-6 rounded"
						>
							{isCheckingConnection
								? t("errorPages.serverUnreachable.retryButton.processing")
								: t("errorPages.serverUnreachable.retryButton.default")}
						</Button>
					</Box>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default ServerUnreachable;
