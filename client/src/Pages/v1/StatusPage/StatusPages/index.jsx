// Components
import { Stack } from "@/Components/v3/ui";
import Breadcrumbs from "@/Components/v1/Breadcrumbs/index.jsx";
import MonitorCreateHeader from "@/Components/v1/MonitorCreateHeader/index.jsx";
import StatusPagesTable from "./Components/StatusPagesTable/index.jsx";
import PageStateWrapper from "@/Components/v1/PageStateWrapper/index.jsx";
// Utils
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import { useStatusPagesFetch } from "./Hooks/useStatusPagesFetch.jsx";
import { useIsAdmin } from "../../../../Hooks/v1/useIsAdmin.js";
const BREADCRUMBS = [{ name: `Status Pages`, path: "" }];

const StatusPages = () => {
	// Utils
	const theme = useTheme();
	const isAdmin = useIsAdmin();
	const [isLoading, networkError, statusPages] = useStatusPagesFetch();

	return (
		<>
			<PageStateWrapper
				networkError={networkError}
				isLoading={isLoading}
				items={statusPages}
				type="statusPage"
				fallbackLink="/status/uptime/create"
			>
				<Stack className="gap-[var(--spacing-10)]">
					<Breadcrumbs list={BREADCRUMBS} />
					<MonitorCreateHeader
						label="Create status page"
						isAdmin={isAdmin}
						path="/status/uptime/create"
						isLoading={isLoading}
					/>
					<StatusPagesTable data={statusPages} />
				</Stack>
			</PageStateWrapper>
		</>
	);
};

export default StatusPages;
