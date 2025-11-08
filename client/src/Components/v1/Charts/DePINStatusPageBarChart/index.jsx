// Components
import { Card, Tooltip } from "@/Components/v3/ui";

// Utils
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { formatDateWithTz } from "../../../../Utils/timeUtils.js";
import { useSelector } from "react-redux";

const PlaceholderCheck = ({ daysToShow }) => {
	return (
		<div
			className="bg-[var(--color-primary-low-contrast)] rounded-[var(--spacing-1-5)]"
			style={{ width: `calc(30vw / ${daysToShow})`, height: "100%" }}
		/>
	);
};

PlaceholderCheck.propTypes = {
	daysToShow: PropTypes.number,
};

const Check = ({ check, daysToShow }) => {
	const [animate, setAnimate] = useState(false);

	useEffect(() => {
		setAnimate(true);
	}, []);
	const uiTimezone = useSelector((state) => state.ui.timezone);

	return (
		<Tooltip
			content={
				<div className="space-y-2">
					<p className="text-xs font-medium text-[var(--color-secondary-contrast-text)]">
						{formatDateWithTz(check._id, "ddd, MMMM D, YYYY", uiTimezone)}
					</p>
					<div className="mt-2">
						<div className="inline-flex justify-between gap-4">
							<span className="opacity-80 text-[11px] font-semibold text-[var(--color-secondary-contrast-text)]">
								Uptime percentage
							</span>
							<span className="text-[var(--color-secondary-contrast-text)]">
								{check.upPercentage.toFixed(2)}
								<span className="opacity-80"> %</span>
							</span>
						</div>
					</div>
				</div>
			}
			placement="top"
			key={`check-${check?._id}`}
		>
			<div
				className="relative bg-[var(--color-error-low-contrast)] rounded-[var(--spacing-1-5)]"
				style={{ width: `calc(30vw / ${daysToShow})`, height: "100%" }}
			>
				<div
					className="absolute bottom-0 w-full bg-[var(--color-success-low-contrast)] rounded-[var(--spacing-1-5)] transition-all duration-600 ease-cubic-bezier-0.4-0-0.2-1"
					style={{
						height: `${animate ? check.upPercentage : 0}%`,
						transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
					}}
				/>
			</div>
		</Tooltip>
	);
};

Check.propTypes = {
	check: PropTypes.object,
	daysToShow: PropTypes.number,
};

const DePINStatusPageBarChart = ({ checks = [], daysToShow = 30 }) => {
	if (checks.length !== daysToShow) {
		const placeholders = Array(daysToShow - checks.length).fill("placeholder");
		checks = [...checks, ...placeholders];
	}
	return (
		<div className="flex justify-between w-full flex-nowrap h-[50px]">
			{checks.map((check) => {
				if (check === "placeholder") {
					return (
						<PlaceholderCheck
							key={Math.random()}
							daysToShow={daysToShow}
						/>
					);
				}
				return (
					<Check
						key={Math.random()}
						check={check}
						daysToShow={daysToShow}
					/>
				);
			})}
		</div>
	);
};

DePINStatusPageBarChart.propTypes = {
	checks: PropTypes.array,
	daysToShow: PropTypes.number,
};

export default DePINStatusPageBarChart;
