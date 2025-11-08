import { Stack, RadioGroup, FormControl, Typography } from "@/Components/v3/ui";
import { TextInput } from "@/Components/v2/Inputs/TextInput";
import { AutoCompleteInput } from "@/Components/v2/Inputs/AutoComplete";
import { ConfigBox, BasePage } from "@/Components/v2/DesignElements";
import { RadioWithDescription } from "@/Components/v2/Inputs/RadioInput";
import { Button } from "@/Components/v2/Inputs";
import { Trash2 } from "lucide-react";

import { useTranslation } from "react-i18next";
import { monitorSchema } from "@/Validation/v2/zod";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, useWatch, type SubmitHandler } from "react-hook-form";
import { useInitForm } from "@/Hooks/v2/useInitMonitorForm";

type FormValues = z.infer<typeof monitorSchema>;

export const UptimeForm = ({
	initialData,
	onSubmit,
	notificationOptions,
	loading,
}: {
	initialData?: Partial<FormValues>;
	onSubmit: SubmitHandler<FormValues>;
	notificationOptions: any[];
	loading: boolean;
}) => {
	const { t } = useTranslation();
	const { defaults } = useInitForm({ initialData: initialData });
	const {
		handleSubmit,
		control,
		setValue,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(monitorSchema) as any,
		defaultValues: defaults,
		mode: "onChange",
	});

	const selectedType = useWatch({
		control,
		name: "type",
	});
	const notificationChannels = useWatch({
		control,
		name: "notificationChannels",
	});

	return (
		<BasePage
			component={"form"}
			onSubmit={handleSubmit(onSubmit)}
		>
			<ConfigBox
				title={t("distributedUptimeCreateChecks")}
				subtitle={t("distributedUptimeCreateChecksDescription")}
				rightContent={
					<Controller
						name="type"
						control={control}
						render={({ field }) => (
							<FormControl error={!!errors.type}>
								<RadioGroup
									{...field}
									className="gap-6"
								>
									<RadioWithDescription
										value="http"
										label={"HTTP"}
										description={"Use HTTP to monitor your website or API endpoint."}
									/>
									<RadioWithDescription
										value="https"
										label="HTTPS"
										description="Use HTTPS to monitor your website or API endpoint.
"
									/>
									<RadioWithDescription
										value="ping"
										label={t("pingMonitoring")}
										description={t("pingMonitoringDescription")}
									/>
								</RadioGroup>
							</FormControl>
						)}
					/>
				}
			/>
			<ConfigBox
				title={t("settingsGeneralSettings")}
				subtitle={t(`uptimeGeneralInstructions.${selectedType}`)}
				rightContent={
					<Stack gap="8">
						<Controller
							name="url"
							control={control}
							render={({ field }) => (
								<TextInput
									{...field}
									type="text"
									label={t("url")}
									fullWidth
									error={!!errors.url}
									helperText={errors.url ? errors.url.message : ""}
								/>
							)}
						/>
						<Controller
							name="name"
							control={control}
							render={({ field }) => (
								<TextInput
									{...field}
									type="text"
									label={t("displayName")}
									fullWidth
									error={!!errors.name}
									helperText={errors.name ? errors.name.message : ""}
								/>
							)}
						/>
					</Stack>
				}
			/>
			<ConfigBox
				title={t("createMonitorPage.incidentConfigTitle")}
				subtitle={t("createMonitorPage.incidentConfigDescriptionV2")}
				rightContent={
					<Controller
						name="n"
						control={control}
						render={({ field }) => (
							<TextInput
								{...field}
								type="number"
								label={t("createMonitorPage.incidentConfigStatusCheckNumber")}
								fullWidth
								error={!!errors.n}
								helperText={errors.n ? errors.n.message : ""}
								onChange={(e) => {
									const target = e.target as HTMLInputElement;
									field.onChange(target.valueAsNumber);
								}}
							/>
						)}
					/>
				}
			/>
			<ConfigBox
				title={t("notificationConfig.title")}
				subtitle={t("notificationConfig.description")}
				rightContent={
					<Stack>
						<Controller
							name="notificationChannels"
							control={control}
							defaultValue={[]} // important!
							render={({ field }) => (
								<AutoCompleteInput
									multiple
									options={notificationOptions}
									getOptionLabel={(option) => option.name}
									value={notificationOptions.filter((o: any) =>
										(field.value || []).includes(o._id)
									)}
									onChange={(_, newValue) => {
										field.onChange(newValue.map((o: any) => o._id));
									}}
								/>
							)}
						/>
						<Stack
							gap="2"
							className="mt-2"
						>
							{notificationChannels.map((notificationId) => {
								const option = notificationOptions.find(
									(o: any) => o._id === notificationId
								);
								if (!option) return null;
								return (
									<div
										className="w-full flex justify-between items-center"
										key={notificationId}
									>
										<Typography>{option.name}</Typography>
										<Trash2
											onClick={() => {
												const updated = notificationChannels.filter(
													(id) => id !== notificationId
												);
												setValue("notificationChannels", updated);
											}}
											className="cursor-pointer"
										/>
									</div>
								);
							})}
						</Stack>
					</Stack>
				}
			/>
			<ConfigBox
				title={t("createMonitorPage.intervalTitle")}
				subtitle="How often to check the URL"
				rightContent={
					<Controller
						name="interval"
						control={control}
						render={({ field }) => (
							<TextInput
								{...field}
								type="text"
								label={t("createMonitorPage.intervalDescription")}
								fullWidth
								error={!!errors.interval}
								helperText={errors.interval ? errors.interval.message : ""}
							/>
						)}
					/>
				}
			/>
			<div className="flex justify-end">
				<Button
					loading={loading}
					type="submit"
					variant="default"
				>
					{t("settingsSave")}
				</Button>
			</div>
		</BasePage>
	);
};
