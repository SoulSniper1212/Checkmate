import { ButtonGroup } from "@/Components/v3/ui";
import type { ButtonGroupProps } from "@/Components/v3/ui/button-group";
export const ButtonGroupInput: React.FC<ButtonGroupProps> = ({
	orientation,
	...props
}) => {
	return (
		<ButtonGroup
			orientation={orientation}
			{...props}
		/>
	);
};
