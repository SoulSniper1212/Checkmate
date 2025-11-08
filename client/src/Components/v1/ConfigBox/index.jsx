import { Stack } from "@/Components/v3/ui";
import { cn } from "@/lib/utils";

const ConfigBox = ({ className, children, ...props }) => {
	return (
		<Stack
			className={cn(
				"flex-row justify-between bg-primary border border-border rounded-lg p-15",
				className
			)}
			{...props}
		>
			{children}
		</Stack>
	);
};

// ConfigBox.Item component for the first child
ConfigBox.Item = ({ className, children, ...props }) => {
	return (
		<div
			className={cn(
				"flex-[0.7] border-r border-r-border pr-15 pl-15 bg-secondary py-15 [&:is(h1,h2):first-of-type]:font-semibold [&:is(h1,h2):first-of-type]:mb-4",
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
};

// ConfigBox.Content component for the last child
ConfigBox.Content = ({ className, children, ...props }) => {
	return (
		<div
			className={cn(
				"flex-1 pr-20 pl-20 py-15 text-primary-foreground",
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
};

export default ConfigBox;
