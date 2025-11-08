import { AuthBasePage } from "@/Components/v2/Auth";
import { Button } from "@/Components/v2/Inputs";
import { Stack } from "@/Components/v3/ui/stack";
import { TextInput, TextLink } from "@/Components/v2/Inputs";

import type { ApiResponse } from "@/Hooks/v2/UseApi";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePost } from "@/Hooks/v2/UseApi";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "@/Features/Auth/v2AuthSlice";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";

const schema = z.object({
	email: z.email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { post, loading } = usePost<FormData, ApiResponse>();
	const navigate = useNavigate();

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: FormData) => {
		const result = await post("/auth/login", data);
		if (result) {
			dispatch(setIsAuthenticated({ authenticated: true }));
			navigate("/v2/uptime");
		} else {
			dispatch(setIsAuthenticated({ authenticated: false }));
		}
	};

	return (
		<AuthBasePage
			title={t("auth.login.welcome")}
			subtitle={t("auth.login.heading")}
		>
			<Stack
				direction="column"
				alignItems="center"
				justifyContent="center"
				spacing={32} // theme.spacing(8) ≈ 32px
				className="w-full"
			>
				<Stack
					component="form"
					direction="column"
					spacing={48} // theme.spacing(12) ≈ 48px
					onSubmit={handleSubmit(onSubmit)}
					sx={{
						maxWidth: 400,
						padding: 32, // theme.spacing(8) ≈ 32px
						width: {
							sm: "80%",
							md: "70%",
							lg: "65%",
							xl: "65%",
						},
					}}
				>
					<Controller
						name="email"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<TextInput
								{...field}
								label={t("auth.common.inputs.email.label")}
								fullWidth
								placeholder={t("auth.common.inputs.email.placeholder")}
								error={!!errors.email}
								helperText={errors.email ? errors.email.message : ""}
							/>
						)}
					/>
					<Controller
						name="password"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<TextInput
								{...field}
								type="password"
								label={t("auth.common.inputs.password.label")}
								fullWidth
								placeholder="••••••••••"
								error={!!errors.password}
								helperText={errors.password ? errors.password.message : ""}
							/>
						)}
					/>
					<Button
						variant="contained"
						loading={loading}
						color="accent"
						type="submit"
						sx={{ width: "100%", alignSelf: "center", fontWeight: 700 }}
					>
						Login
					</Button>
				</Stack>
				<TextLink
					text={t("auth.login.links.forgotPassword")}
					linkText={t("auth.login.links.forgotPasswordLink")}
					href="/forgot-password"
				/>
				<TextLink
					text={t("auth.login.links.register")}
					linkText={t("auth.login.links.registerLink")}
					href="/register"
				/>
			</Stack>
		</AuthBasePage>
	);
};

export default Login;
