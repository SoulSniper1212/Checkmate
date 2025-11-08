import { Stack } from "@/Components/v3/ui";
import { MonitorStatus } from "@/Components/v2/Monitors/MonitorStatus";
import { ButtonGroup, Button } from "@/Components/v2/Inputs";
import { Settings, Pause, Play, Mail, Bug } from "lucide-react";

import { useTranslation } from "react-i18next";

import type { IMonitor } from "@/Types/Monitor";

export const HeaderControls = ({
	monitor,
	patch,
	isPatching,
	refetch,
}: {
	monitor: IMonitor;
	patch: Function;
	isPatching: boolean;
	refetch: Function;
}) => {
	const { t } = useTranslation();

	return (
		<Stack
			direction="col md:row"
			gap={4}
			mdGap={0}
			justifyContent={"space-between"}
		>
			<MonitorStatus monitor={monitor} />
			<Stack
				direction={"row"}
				gap={2}
			>
				<ButtonGroup
					orientation="vertical md:horizontal"
					fullWidth="md"
					variant="contained"
					color="secondary"
				>
					<Button startIcon={<Mail />}>{t("sendTestNotifications")}</Button>
					<Button startIcon={<Bug />}>{t("menu.incidents")}</Button>
					<Button
						loading={isPatching}
						onClick={async () => {
							await patch(`/monitors/${monitor._id}/active`);
							refetch();
						}}
						startIcon={
							monitor?.isActive ? <Pause /> : <Play />
						}
					>
						{monitor?.isActive ? t("pause") : t("resume")}
					</Button>
					<Button startIcon={<Settings />}>{t("configure")}</Button>
				</ButtonGroup>
			</Stack>
		</Stack>
	);
};
