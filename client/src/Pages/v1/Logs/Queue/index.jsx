// Components
import { Stack, ButtonGroup, Button, Typography, Divider } from "@/Components/v3/ui";
import JobTable from "./components/JobTable/index.jsx";
import Metrics from "./components/Metrics/index.jsx";
import FailedJobTable from "./components/FailedJobTable/index.jsx";

// Utils
import { useState } from "react";
import { useFetchQueueData, useFlushQueue } from "../../../../Hooks/v1/logHooks.js";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";

const QueueDetails = () => {
	// Local state
	const [trigger, setTrigger] = useState(false);

	// Hooks
	const { t } = useTranslation();
	const theme = useTheme();
	const [jobs, metrics, isLoading, error] = useFetchQueueData(trigger);
	const [flushQueue, isFlushing, flushError] = useFlushQueue();

	if (isLoading) return <div>Loading...</div>;
	if (error || flushError) return <div>Error: {error.message}</div>;

	return (
		<Stack className="gap-[var(--spacing-4)]">
			<Stack
				className="gap-[var(--spacing-20)] mt-[var(--spacing-10)]"
			>
				<Metrics metrics={metrics} />
				<JobTable jobs={jobs} />
				<FailedJobTable metrics={metrics} />

				<ButtonGroup
					variant="contained"
					color="primary"
					className="sticky bottom-0 z-[1000] bg-primary p-[var(--spacing-4)] border border-primary-low-contrast rounded-[var(--spacing-2)]"
				>
					<Button
						onClick={() => {
							setTrigger(!trigger);
						}}
						loading={isLoading}
					>
						{t("queuePage.refreshButton")}
					</Button>
					<Button
						onClick={() => flushQueue(trigger, setTrigger)}
						loading={isFlushing}
					>
						{t("queuePage.flushButton")}
					</Button>
				</ButtonGroup>
			</Stack>
		</Stack>
	);
};

export default QueueDetails;
