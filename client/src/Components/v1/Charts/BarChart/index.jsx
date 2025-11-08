import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Tooltip } from "@/Components/v3/ui";
import { Box, Stack, Typography } from "@/Components/v3/ui";
import { formatDateWithTz } from "../../../../Utils/timeUtils.js";
import "./index.css";

/* TODO add prop validation and jsdocs */
const BarChart = ({ checks = [] }) => {
	const [animate, setAnimate] = useState(false);
	const uiTimezone = useSelector((state) => state.ui.timezone);

	useEffect(() => {
		setAnimate(true);
	});

	// set responseTime to average if there's only one check
	if (checks.length === 1) {
		checks[0] = { ...checks[0], responseTime: 50 };
	}

	if (checks.length !== 25) {
		const placeholders = Array(25 - checks.length).fill("placeholder");
		checks = [...checks, ...placeholders];
	}

	return (
		<Stack
			direction="row"
			flexWrap="nowrap"
			gap="6px"
			height="50px"
			width="fit-content"
			onClick={(event) => event.stopPropagation()}
			className="cursor-default"
		>
			{checks.map((check, index) =>
				check === "placeholder" ? (
					/* TODO what is the purpose of this box? 	*/
					// CAIO_REVIEW the purpose of this box is to make sure there are always at least 25 bars
					// even if there are less than 25 checks
					<Box
						key={`${check}-${index}`}
						position="relative"
						width="18px"
						height="100%"
						className="bg-slate-200 rounded-lg"
					/>
				) : (
					<Tooltip
						title={
							<>
								<Typography>
									{formatDateWithTz(
										check.updatedAt,
										"ddd, MMMM D, YYYY, HH:mm A",
										uiTimezone
									)}
								</Typography>
								<Box className="mt-2">
									<Box
										display="inline-block"
										width="16px"
										height="16px"
										className={check.status ? "bg-green-200" : "bg-red-200"}
										style={{ borderRadius: "50%" }}
									/>
									<Stack
										display="inline-flex"
										direction="row"
										justifyContent="space-between"
										ml="8px"
										gap="48px"
									>
										<Typography
											component="span"
											className="opacity-80"
										>
											Response Time
										</Typography>
										<Typography component="span">
											{check.originalResponseTime}
											<Typography
												component="span"
												className="opacity-80"
											>
												{" "}
												ms
											</Typography>
										</Typography>
									</Stack>
								</Box>
							</>
						}
						placement="top"
						key={`check-${check?._id}`}
					>
						<Box
							position="relative"
							width="9px"
							height="100%"
							className="bg-slate-200 rounded-lg"
						>
							<Box
								position="absolute"
								bottom={0}
								width="100%"
								height={`${animate ? check.responseTime : 0}%`}
								className={check.status ? "bg-green-200" : "bg-red-200"}
								style={{
									borderRadius: "6px",
									transition: "height 600ms cubic-bezier(0.4, 0, 0.2, 1)",
								}}
							/>
						</Box>
					</Tooltip>
				)
			)}
		</Stack>
	);
};

export default BarChart;
