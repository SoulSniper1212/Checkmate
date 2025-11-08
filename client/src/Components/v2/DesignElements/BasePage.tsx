import { Stack } from "@/Components/v3/ui";
import { ErrorFallback, EmptyFallback } from "./Fallback";
import { useTranslation } from "react-i18next";

interface BasePageProps {
	children: React.ReactNode;
	className?: string;
}

export const BasePage: React.FC<BasePageProps> = ({
	children,
	className,
	...props
}: BasePageProps) => {
	return (
		<Stack
			gap={10}
			className={className}
			{...props}
		>
			{children}
		</Stack>
	);
};

interface BasePageWithStatesProps {
	loading: boolean;
	error: any;
	items: any[];
	page: string;
	actionLink?: string;
	children: React.ReactNode;
	className?: string;
}

const isEmpty = (items: any[]) => {
	if (!items) return true;
	if (Array.isArray(items) && items.length === 0) return true;
	return false;
};

export const BasePageWithStates: React.FC<BasePageWithStatesProps> = ({
	loading,
	error,
	items,
	page,
	actionLink,
	children,
	className,
	...props
}: BasePageWithStatesProps) => {
	const { t } = useTranslation();

	if (loading) {
		return null;
	}

	if (error) {
		return (
			<ErrorFallback
				title="Something went wrong..."
				subtitle="Please try again later"
			/>
		);
	}

	if (isEmpty(items)) {
		return (
			<EmptyFallback
				page={page}
				title={t(`${page}Monitor.fallback.title`)}
				bullets={t(`${page}Monitor.fallback.checks`, { returnObjects: true })}
				actionButtonText={t(`${page}Monitor.fallback.actionButton`)}
				actionLink={actionLink || ""}
			/>
		);
	}

	return <BasePage className={className} {...props}>{children}</BasePage>;
};
