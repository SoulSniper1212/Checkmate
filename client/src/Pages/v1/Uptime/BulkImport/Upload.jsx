import { useTheme } from "@/Utils/Theme/globalTheme.jsx";
import { useState, useRef } from "react";
import { Typography, Button } from "@/Components/v3/ui";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const UploadFile = ({ onFileSelect }) => {
	// Changed prop to onFileSelect
	const theme = useTheme();
	const [file, setFile] = useState();
	const [error, setError] = useState("");
	const inputRef = useRef();
	const { t } = useTranslation();

	const handleSelectFile = () => {
		inputRef.current.click();
	};

	const handleFileChange = (e) => {
		setError("");
		const selectedFile = e.target.files[0];

		// Basic file validation
		if (!selectedFile) return;

		if (!selectedFile.name.toLowerCase().endsWith(".csv")) {
			setError(t("bulkImport.invalidFileType"));
			return;
		}

		setFile(selectedFile);
		onFileSelect(selectedFile); // Pass the file directly to parent
	};

	return (
		<div>
			<input
				ref={inputRef}
				type="file"
				accept=".csv"
				style={{ display: "none" }}
				onChange={handleFileChange}
			/>
			<Typography
				component="h2"
				className="mb-[var(--spacing-1_5)] break-all"
			>
				{file?.name || t("bulkImport.noFileSelected")}
			</Typography>
			<Typography
				component="div"
				className="mb-[var(--spacing-1_5)] text-destructive"
			>
				{error}
			</Typography>
			<Button
				muiVariant="contained"
				color="primary"
				onClick={handleSelectFile}
			>
				{t("bulkImport.selectFile")}
			</Button>
		</div>
	);
};

UploadFile.prototype = {
	onFileSelect: PropTypes.func.isRequired,
};

export default UploadFile;
