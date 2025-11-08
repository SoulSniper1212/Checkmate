import { Stack } from "@/Components/v3/ui";
import { Button } from "@/Components/v3/ui";
import { Box } from "@/Components/v3/ui";
import { Typography } from "@/Components/v3/ui";
import { useEffect, useState } from "react";
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createToast } from "../../../Utils/toastUtils.jsx";
import { forgotPassword } from "../../../Features/Auth/authSlice.js";
import { Trans, useTranslation } from "react-i18next";
import Background from "../../../assets/Images/background-grid.svg?react";
import EmailIcon from "../../../assets/icons/email.svg?react";
import Logo from "../../../assets/icons/checkmate-icon.svg?react";
import IconBox from "@/Components/v1/IconBox/index.jsx";
import "./index.css";

const CheckEmail = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const [email, setEmail] = useState();
	const [disabled, setDisabled] = useState(false);
	useEffect(() => {
		setEmail(sessionStorage.getItem("email"));
	}, []);

	// TODO - fix
	const openMail = () => {
		window.location.href = "mailto:";
	};

	const toastFail = [
		{
			body: t("auth.forgotPassword.toasts.emailNotFound"),
		},
		{
			body: t("auth.forgotPassword.toasts.redirect").replace("<seconds/>", "3"),
		},
		{
			body: t("auth.forgotPassword.toasts.redirect").replace("<seconds/>", "2"),
		},
		{
			body: t("auth.forgotPassword.toasts.redirect").replace("<seconds/>", "1"),
		},
	];

	const resendToken = async () => {
		setDisabled(true); // prevent resent button from being spammed
		if (!email) {
			let index = 0;
			const interval = setInterval(() => {
				if (index < toastFail.length) {
					createToast(toastFail[index]);
					index++;
				} else {
					clearInterval(interval);
					navigate("/forgot-password");
				}
			}, 1000);
		} else {
			const form = { email: email };
			const action = await dispatch(forgotPassword(form));
			if (action.payload.success) {
				createToast({
					body: t("auth.forgotPassword.toasts.sent").replace("<email/>", form.email),
				});
				setDisabled(false);
			} else {
				if (action.payload) {
					// dispatch errors
					createToast({
						body: action.payload.msg, // FIXME: Potential untranslated string
					});
				} else {
					// unknown errors
					createToast({
						body: t("common.toasts.unknownError"),
					});
				}
			}
		}
	};

	const handleNavigate = () => {
		sessionStorage.removeItem("email");
		navigate("/login");
	};

	return (
		<div className="check-email-page auth overflow-hidden" style={{
			"& h1": {
				color: theme.palette?.primary?.main,
				fontWeight: 600,
				fontSize: 22,
			},
			"& p": { color: theme.palette?.primary?.contrastTextSecondary, fontSize: 13.5 },
			"& span": { fontSize: "inherit" },
		}}>
			<div
				className="background-pattern-svg"
				style={{
					"& svg g g:last-of-type path svg g g:last-child path svg g g:last-child path": {
						stroke: theme.palette?.primary?.lowContrast,
					},
				}}
			>
				<Background style={{ width: "100%" }} />
			</div>
			<div className="flex items-center" style={{
				paddingLeft: theme.spacing ? theme.spacing(12) : "48px",
				paddingRight: theme.spacing ? theme.spacing(12) : "48px",
				gap: theme.spacing ? theme.spacing(4) : "16px",
			}}>
				<Logo style={{ borderRadius: theme.shape?.borderRadius || "8px" }} />
				<Typography style={{ userSelect: "none" }}>{t("common.appName")}</Typography>
			</div>
			<div className="flex-1 flex justify-center mx-auto" style={{
				width: "100%",
				maxWidth: 600,
				paddingLeft: theme.spacing ? theme.spacing(12) : "48px",
				paddingRight: theme.spacing ? theme.spacing(20) : "80px",
				paddingBottom: theme.spacing ? theme.spacing(20) : "80px",
				"& > div": {
					border: "1px solid",
					borderRadius: theme.spacing ? theme.spacing(5) : "20px",
					borderColor: theme.palette?.primary?.lowContrast,
					backgroundColor: theme.palette?.primary?.main,
					padding: theme.spacing ? theme.spacing(12) : "48px",
				},
			}}>
				<div className="flex flex-col items-center text-center gap-10">
					<div>
						<div className="flex justify-center">
							<IconBox
								height={48}
								width={48}
								minWidth={48}
								borderRadius={12}
								svgWidth={24}
								svgHeight={24}
								mb={theme.spacing ? theme.spacing(4) : "16px"}
							>
								<EmailIcon alt={t("auth.forgotPassword.imageAlts.email")} />
							</IconBox>
						</div>
						<Typography component="h1">{t("auth.forgotPassword.heading")}</Typography>
						<Typography>
							<Trans
								i18nKey="auth.forgotPassword.subheadings.stepTwo"
								components={{
									email: (
										<Typography
											className="email-sent-to"
											component="span"
										>
											{email || "username@email.com"}
										</Typography>
									),
								}}
							/>
						</Typography>
					</div>
					<Button
						variant="default"
						onClick={openMail}
						className="w-full max-w-md"
					>
						{t("auth.forgotPassword.buttons.openEmail")}
					</Button>
					<Typography style={{ alignSelf: "center", marginTop: theme.spacing ? theme.spacing(6) : "24px" }}>
						<Trans
							i18nKey="auth.forgotPassword.links.resend"
							components={{
								a: (
									<Typography
										component="span"
										onClick={resendToken}
										style={{
											color: theme.palette?.accent?.main,
											userSelect: "none",
											pointerEvents: disabled ? "none" : "auto",
											cursor: disabled ? "default" : "pointer",
											opacity: disabled ? 0.5 : 1,
										}}
									/>
								),
							}}
						/>
					</Typography>
				</div>
			</div>
			<div
				className="text-center"
				style={{
					padding: theme.spacing ? theme.spacing(12) : "48px",
				}}
			>
				<Typography display="inline-block">
					<Trans
						i18nKey="auth.forgotPassword.links.login"
						components={{
							a: (
								<Typography
									component="span"
									style={{
										color: theme.palette?.accent?.main,
										marginLeft: theme.spacing ? theme.spacing(2) : "8px",
										userSelect: "none",
									}}
									onClick={handleNavigate}
								/>
							),
						}}
					/>
				</Typography>
			</div>
		</div>
	);
};

export default CheckEmail;
