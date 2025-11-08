import { Stack, Box, Typography } from "@/Components/v3/ui";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

export const Logo = ({ collapsed }: { collapsed: boolean }) => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	return (
		<Stack
			className="pt-6 pb-12 pl-8 flex-row items-center gap-4 cursor-pointer"
			onClick={() => navigate("/")}
		>
			<Typography
				className="pl-[1px] min-w-[16px] min-h-[16px] flex justify-center items-center bg-accent text-accent-foreground rounded-md text-[18px]"
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
					className="leading-none mt-0.5 text-foreground"
					variant="h2"
				>
					{t("common.appName")}
				</Typography>
			</Box>
		</Stack>
	);
};
