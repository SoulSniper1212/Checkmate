import { Stack } from "@/Components/v3/ui";
import { Button } from "@/Components/v2/Inputs";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
export const HeaderCreate = ({
	label,
	isLoading,
	path,
}: {
	label?: string;
	isLoading: boolean;
	path: string;
}) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	return (
		<Stack
			direction="row"
			justifyContent="end"
			alignItems="center"
			gap={6}
		>
			<Button
				loading={isLoading}
				variant="contained"
				color="accent"
				onClick={() => navigate(path)}
			>
				{label || t("createNew")}
			</Button>
		</Stack>
	);
};
