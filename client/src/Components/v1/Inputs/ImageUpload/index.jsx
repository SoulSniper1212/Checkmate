// Components
import { Box, Stack, Typography } from "@/Components/v3/ui";
import { IconButton } from "@/Components/v3/ui";
import { TextField } from "@/Components/v3/ui";
import { CloudUpload, Image as ImageIcon } from "lucide-react";
import Image from "../../Image/index.jsx";
import ProgressUpload from "../../ProgressBars/index.jsx";

// Utils
import PropTypes from "prop-types";
import { useCallback, useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

/**
 * ImageUpload component allows users to upload images with drag-and-drop functionality.
 * It supports file size and format validation.
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean} [props.previewIsRound=false] - Determines if the image preview should be round
 * @param {string} [props.src] - Source URL of the image to display
 * @param {function} props.onChange - Callback function to handle file change, takes a file as an argument
 * @param {number} [props.maxSize=3145728] - Maximum file size allowed in bytes (default is 3MB)
 * @param {Array<string>} [props.accept=['jpg', 'jpeg', 'png']] - Array of accepted file formats
 * @param {Object} [props.errors] - Object containing error messages
 * @returns {JSX.Element} The rendered component
 */
const ImageUpload = ({
	previewIsRound = false,
	src,
	onChange,
	maxSize = 3 * 1024 * 1024,
	accept = ["jpg", "jpeg", "png"],
	error,
}) => {
	const { t } = useTranslation();
	const [uploadComplete, setUploadComplete] = useState(false);
	const [completedFile, setCompletedFile] = useState(null);
	const [file, setFile] = useState(null);
	const [progress, setProgress] = useState({ value: 0, isLoading: false });
	const intervalRef = useRef(null);
	const [localError, setLocalError] = useState(null);
	const [isDragging, setIsDragging] = useState(false);

	const roundStyle = previewIsRound ? { borderRadius: "50%" } : {};

	const handleImageChange = useCallback(
		(file) => {
			if (!file) return;

			const isValidType = accept.some((type) => file.type.includes(type));
			const isValidSize = file.size <= maxSize;

			if (!isValidType) {
				setLocalError(t("invalidFileFormat"));
				return;
			}
			if (!isValidSize) {
				setLocalError(t("invalidFileSize"));
				return;
			}

			setLocalError(null);

			const previewFile = {
				src: URL.createObjectURL(file),
				name: file.name,
				file,
			};

			setFile(previewFile);
			setProgress({ value: 0, isLoading: true });

			intervalRef.current = setInterval(() => {
				setProgress((prev) => {
					const buffer = 12;
					if (prev.value + buffer >= 100) {
						clearInterval(intervalRef.current);
						setUploadComplete(true);
						setCompletedFile(previewFile);
						return { value: 100, isLoading: false };
					}
					return { value: prev.value + buffer, isLoading: true };
				});
			}, 120);
		},
		[maxSize, accept]
	);

	useEffect(() => {
		if (uploadComplete && completedFile) {
			onChange?.(completedFile);
			setUploadComplete(false);
			setCompletedFile(null);
		}
	}, [uploadComplete, completedFile, onChange]);

	return (
		<>
			{src ? (
				<Stack
					direction="row"
					justifyContent="center"
				>
					<Image
						alt="Uploaded preview"
						src={src}
						width="250px"
						height="250px"
						style={{ ...roundStyle }}
					/>
				</Stack>
			) : (
				<>
					<Box
						className="image-field-wrapper mt-8 relative h-fit border-2 border-dashed rounded-md transition-all duration-200 hover:border-blue-500 hover:bg-blue-500/5"
						style={{
							borderColor: isDragging ? "#3b82f6" : "#e2e8f0",
							backgroundColor: isDragging ? "rgba(59, 130, 246, 0.05)" : "transparent",
						}}
						onDragEnter={() => setIsDragging(true)}
						onDragLeave={() => setIsDragging(false)}
						onDrop={() => setIsDragging(false)}
					>
						<TextField
							type="file"
							onChange={(e) => handleImageChange(e?.target?.files?.[0])}
							className="w-full"
							style={{
								"& input[type='file']": {
									opacity: 0,
									cursor: "pointer",
									maxWidth: "500px",
									minHeight: "175px",
									zIndex: 1,
								},
								"& fieldset": {
									padding: 0,
									border: "none",
								},
							}}
						/>
						<Stack
							alignItems="center"
							gap="4px"
							className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 w-full"
						>
							<IconButton
								className="pointer-events-none rounded-md border border-slate-200 shadow-sm"
								disabled
							>
								<CloudUpload />
							</IconButton>
							<Typography
								component="h2"
								className="text-slate-500"
							>
								<Typography
									component="span"
									fontSize="inherit"
									className="text-blue-500 font-medium"
								>
									{t("ClickUpload")}
								</Typography>{" "}
								or {t("DragandDrop")}
							</Typography>
							<Typography
								component="p"
								className="text-slate-500 opacity-60"
							>
								({t("MaxSize")}: {Math.round(maxSize / 1024 / 1024)}MB)
							</Typography>
						</Stack>
					</Box>
					{(localError || progress.isLoading || progress.value !== 0) && (
						<ProgressUpload
							icon={<ImageIcon />}
							label={file?.name || "Upload failed"}
							size={file?.size}
							progress={progress.value}
							onClick={() => {
								clearInterval(intervalRef.current);
								setFile(null);
								setProgress({ value: 0, isLoading: false });
								setLocalError(null);
								onChange(undefined);
							}}
							error={localError || error}
						/>
					)}
					<Typography
						component="p"
						className="text-slate-500 opacity-60"
					>
						{t("SupportedFormats")}: {accept.join(", ").toUpperCase()}
					</Typography>
				</>
			)}
		</>
	);
};

ImageUpload.propTypes = {
	previewIsRound: PropTypes.bool,
	src: PropTypes.string,
	onChange: PropTypes.func,
	maxSize: PropTypes.number,
	accept: PropTypes.array,
	error: PropTypes.string,
};

export default ImageUpload;
