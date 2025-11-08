import { Input as ShadcnInput } from "@/Components/v3/ui/input";
import { Textarea as ShadcnTextarea } from "@/Components/v3/ui/textarea";
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import { forwardRef, useState, cloneElement } from "react";
import PropTypes from "prop-types";
import FieldWrapper from "../FieldWrapper/index.jsx";

const getInputStyles = (type, maxWidth) => {
	const baseStyles = {
		maxWidth: maxWidth,
	};

	if (type === "url") {
		return {
			...baseStyles,
			borderTopLeftRadius: "0.375rem",
			borderBottomLeftRadius: "0.375rem",
		};
	}
	return baseStyles;
};

const Required = () => {
	return (
		<span className="ml-1 text-destructive">
			*
		</span>
	);
};

const Optional = ({ optionalLabel }) => {
	return (
		<span
			className="ml-2 text-muted-foreground"
			style={{ opacity: 0.6 }}
		>
			{optionalLabel || "(optional)"}
		</span>
	);
};

Optional.propTypes = {
	optionalLabel: PropTypes.string,
};

const TextInput = forwardRef(
	(
		{
			id,
			name,
			type,
			value,
			placeholder,
			isRequired,
			isOptional,
			optionalLabel,
			onChange,
			onBlur,
			error = false,
			helperText = null,
			startAdornment = null,
			endAdornment = null,
			label = null,
			maxWidth = "100%",
			flex,
			marginTop,
			marginRight,
			marginBottom,
			marginLeft,
			disabled = false,
			hidden = false,
			//FieldWrapper's props
			gap,
			labelMb,
			labelFontWeight,
			labelVariant,
			labelSx = {},
			sx = {},
		},
		ref
	) => {
		const [fieldType, setFieldType] = useState(type);
		const theme = useTheme();
		const labelContent = label && (
			<>
				{label}
				{isRequired && <Required />}
				{isOptional && <Optional optionalLabel={optionalLabel} />}
			</>
		);
		return (
			<FieldWrapper
				label={labelContent}
				labelMb={labelMb}
				labelVariant={labelVariant}
				labelFontWeight={labelFontWeight}
				labelSx={labelSx}
				gap={gap}
				sx={{
					flex,
					display: hidden ? "none" : "",
					mt: marginTop,
					mr: marginRight,
					mb: marginBottom,
					ml: marginLeft,
					...sx,
				}}
			>
				{type === "textarea" ? (
					<ShadcnTextarea
						id={id}
						name={name}
						value={value}
						placeholder={placeholder}
						onChange={onChange}
						onBlur={onBlur}
						ref={ref}
						style={getInputStyles(type, maxWidth)}
						disabled={disabled}
					/>
				) : (
					<div className="relative">
						{startAdornment && (
							<div className="absolute left-3 top-1/2 transform -translate-y-1/2">
								{startAdornment}
							</div>
						)}
						<ShadcnInput
							id={id}
							name={name}
							type={fieldType}
							value={value}
							placeholder={placeholder}
							onChange={onChange}
							onBlur={onBlur}
							ref={ref}
							style={getInputStyles(type, maxWidth)}
							disabled={disabled}
							className={startAdornment ? "pl-10" : ""}
						/>
						{endAdornment && (
							<div className="absolute right-3 top-1/2 transform -translate-y-1/2">
								{cloneElement(endAdornment, { fieldType, setFieldType })}
							</div>
						)}
					</div>
				)}
				{error && helperText && (
					<p className="text-sm text-destructive mt-1">{helperText}</p>
				)}
			</FieldWrapper>
		);
	}
);

TextInput.displayName = "TextInput";

TextInput.propTypes = {
	type: PropTypes.string,
	id: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	placeholder: PropTypes.string,
	isRequired: PropTypes.bool,
	isOptional: PropTypes.bool,
	optionalLabel: PropTypes.string,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	error: PropTypes.bool,
	helperText: PropTypes.string,
	startAdornment: PropTypes.node,
	endAdornment: PropTypes.node,
	label: PropTypes.string,
	maxWidth: PropTypes.string,
	flex: PropTypes.number,
	marginTop: PropTypes.string,
	marginRight: PropTypes.string,
	marginBottom: PropTypes.string,
	marginLeft: PropTypes.string,
	disabled: PropTypes.bool,
	hidden: PropTypes.bool,
};

export default TextInput;
