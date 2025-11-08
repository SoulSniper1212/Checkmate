import { Button } from "@/Components/v3/ui";
import { Box } from "@/Components/v3/ui";
import ProgressUpload from "@/Components/v1/ProgressBars/index.jsx";
import { Image } from "lucide-react";
import { useTranslation } from "react-i18next";
import { formatBytes } from "../../../../../../Utils/fileUtils.js";
const Progress = ({ isLoading, progressValue, logo, logoType, removeLogo, errors }) => {
	const { t } = useTranslation();
	if (isLoading) {
		return (
			<ProgressUpload
				icon={<ImageIcon />}
				label={logo?.name}
				size={formatBytes(logo?.size)}
				progress={progressValue}
				onClick={removeLogo}
			/>
		);
	}

	if (logo && logoType) {
		return (
			<Box
				width="fit-content"
				alignSelf="center"
			>
				<Button
					muiVariant="contained"
					color="secondary"
					onClick={removeLogo}
				>
					{t("removeLogo")}
				</Button>
			</Box>
		);
	}
};

export default Progress;
