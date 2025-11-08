import { Stack } from "@/Components/v3/ui";
import StatBox from "@/Components/v1/StatBox/index.jsx";
import StatusBoxes from "@/Components/v1/StatusBoxes/index.jsx";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";

const camelToTitle = (str) => {
	return str
		.replace(/([A-Z])/g, " $1")
		.toLowerCase()
		.replace(/^./, (m) => m.toUpperCase());
};

const Metrics = ({ metrics = {} }) => {
	const { t } = useTranslation();
	const theme = useTheme();

	const data = Object.keys(metrics)
		.filter((key) => key !== "jobsWithFailures")
		.map((key) => {
			return { key, title: camelToTitle(key), value: metrics[key] };
		});

	return (
		<StatusBoxes flexWrap="wrap">
			{data.map((metric) => {
				return (
					<StatBox
						key={metric.key}
						heading={metric.title}
						subHeading={metric.value}
					/>
				);
			})}
		</StatusBoxes>
	);
};
export default Metrics;
