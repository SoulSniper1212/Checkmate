import { Stack } from "@/Components/v3/ui";
import { Button } from "@/Components/v3/ui";
import { Typography } from "@/Components/v3/ui";
import { Box } from "@/Components/v3/ui";
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import { createToast } from "../../../Utils/toastUtils.jsx";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../../Features/Auth/authSlice.js";
import { useEffect, useState } from "react";
import { newOrChangedCredentials } from "../../../Validation/validation.js";
import { useNavigate } from "react-router-dom";
import TextInput from "@/Components/v1/Inputs/TextInput/index.jsx";
import Logo from "../../../assets/icons/checkmate-icon.svg?react";
import Key from "../../../assets/icons/key.svg?react";
import Background from "../../../assets/Images/background-grid.svg?react";
import IconBox from "@/Components/v1/IconBox/index.jsx";
import { Trans, useTranslation } from "react-i18next";
import "./index.css";

const ForgotPassword = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const theme = useTheme();

	const { isLoading } = useSelector((state) => state.auth);
	const [errors, setErrors] = useState({});
	const [form, setForm] = useState({
		email: "",
	});

	useEffect(() => {
		const email = sessionStorage.getItem("email");
		email && setForm({ email: sessionStorage.getItem("email") });
	}, []);

	const { t } = useTranslation();

	const handleSubmit = async (event) => {
		event.preventDefault();

		const { error } = newOrChangedCredentials.validate(form, { abortEarly: false });

		if (error) {
			// validation errors
			const err =
				error.details && error.details.length > 0
					? error.details[0].message // FIXME: Possibly untranslated string
					: t("auth.common.errors.validation");
			setErrors({ email: err });
			createToast({
				body: err,
			});
		} else {
			const action = await dispatch(forgotPassword(form));
			if (action.payload.success) {
				sessionStorage.setItem("email", form.email);
				navigate("/check-email");
				createToast({
					body: t("auth.forgotPassword.toasts.sent").replace("<email/>", form.email),
				});
			} else {
				if (action.payload) {
					// dispatch errors
					createToast({
						body: action.payload.msg, // FIXME: Potentially untranslated string
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

	const handleChange = (event) => {
		const { value } = event.target;
		setForm({ email: value });

		const { error } = newOrChangedCredentials.validate(
			{ email: value },
			{ abortEarly: false }
		);

		if (error) setErrors({ email: error.details[0].message });
		else delete errors.email;
	};

	const handleNavigate = () => {
		sessionStorage.removeItem("email");
		navigate("/login");
	};

	return (
		<div className="forgot-password-page auth overflow-hidden" style={{
			"& h1": {
				color: theme.palette?.primary?.main,
				fontWeight: 600,
				fontSize: 21,
			},
			"& p": {
				fontSize: 14,
				color: theme.palette?.primary?.contrastTextSecondary,
			},
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
				<div className="flex flex-col items-center text-center gap-8">
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
								<Key alt={t("auth.forgotPassword.imageAlts.passwordKey")} />
							</IconBox>
						</div>
						<Typography component="h1">{t("auth.forgotPassword.heading")}</Typography>
						<Typography>{t("auth.forgotPassword.subheadings.stepOne")}</Typography>
					</div>
					<form
						className="w-[95%] text-left"
						noValidate
						spellCheck={false}
						onSubmit={handleSubmit}
					>
						<TextInput
							type="email"
							id="forgot-password-email-input"
							label={t("auth.common.inputs.email.label")}
							isRequired={true}
							placeholder={t("auth.common.inputs.email.placeholder")}
							value={form.email}
							onChange={handleChange}
							error={errors.email ? true : false}
							helperText={t(errors.email)} // Localization keys are in validation.js
						/>
						<Button
							variant="default"
							loading={isLoading}
							disabled={errors.email !== undefined}
							onClick={handleSubmit}
							className="w-full"
							style={{
								marginTop: theme.spacing ? theme.spacing(15) : "60px",
							}}
						>
							{t("auth.common.navigation.continue")}
						</Button>
					</form>
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

export default ForgotPassword;
