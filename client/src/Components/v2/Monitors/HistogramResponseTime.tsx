import { Stack, Box } from "@/Components/v3/ui";
import type { Check } from "@/Types/Check";
import { HistogramResponseTimeTooltip } from "@/Components/v2/Monitors/HistogramResponseTimeTooltip";
import { normalizeResponseTimes } from "@/Utils/v2/DataUtils";

export const HistogramResponseTime = ({ checks }: { checks: Check[] }) => {
	const normalChecks = normalizeResponseTimes(checks, "responseTime");
	let data = Array<any>();

	if (!normalChecks || normalChecks.length === 0) {
		return null;
	}
	if (normalChecks.length !== 25) {
		const placeholders = Array(25 - normalChecks.length).fill("placeholder");
		data = [...normalChecks, ...placeholders];
	} else {
		data = normalChecks;
	}

	return (
		<Stack
			direction="row"
			flexWrap="nowrap"
			gap={1.5}
			height="50px"
			width="fit-content"
			onClick={(event) => event.stopPropagation()}
			className="cursor-default"
		>
			{data.map((check, index) => {
				if (check === "placeholder") {
					return (
						<Box
							key={`${check}-${index}`}
							position="relative"
							className="w-[18px] h-full bg-border rounded-[6px]"
						/>
					);
				} else {
					return (
						<HistogramResponseTimeTooltip
							key={`${check}-${index}`}
							check={check}
						>
							<Box
								position="relative"
								className="w-[9px] h-full bg-border rounded-[6px]"
							>
								<Box
									position="absolute"
									bottom={0}
									className="w-full transition-all duration-600 ease-out rounded-[6px]"
									style={{
										height: `${check.normalResponseTime}%`,
										backgroundColor: check.status ? "hsl(var(--success))" : "hsl(var(--destructive))"
									}}
								/>
							</Box>
						</HistogramResponseTimeTooltip>
					);
				}
			})}
		</Stack>
	);
};
