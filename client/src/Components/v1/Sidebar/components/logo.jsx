import { Stack, Box, Typography } from "@/Components/v3/ui";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const Logo = ({ collapsed }) => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	return (
		<Stack
			className="pt-6 pb-12 pl-8 flex-row items-center gap-4 cursor-pointer"
			onClick={() => navigate("/")}
		>
			<Typography
				className="pl-px min-w-16 min-h-16 flex justify-center items-center bg-accent text-accent-foreground rounded text-[18px]"
			>
				C
			</Typography>
			<Box
				className="overflow-hidden transition-all duration-900 ease-in-out whitespace-nowrap"
				style={{
					opacity: collapsed ? 0 : 1,
					width: collapsed ? 0 : "100%",
				}}
			>
				<Typography
					className="leading-none mt-2 text-primary-foreground text-[var(--env-var-font-size-medium-plus)] font-medium"
				>
					{t("common.appName")}
				</Typography>
			</Box>
		</Stack>
	);
};

Logo.propTypes = {
	collapsed: PropTypes.bool,
};

export default Logo;
