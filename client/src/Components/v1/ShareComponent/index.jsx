import html2canvas from "html2canvas";
import { Button } from "@/Components/v3/ui";
import { useTheme } from "@/Utils/Theme/globalTheme.jsx";

// Simple share icon
const ShareIcon = () => (
	<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
		<path d="M18 16.08c-.76 0-1.44.3-1.96-.97C23.04 16.27 24.35 15.11 22.6 13.36c-.2-.2-.3-.43-.3-.67a1.31 1.31 0 0 0-1.05-2.03c.05-.1.34-.05.71-.05-1.07.05-.28.05-.54.05-.81.02-1.06.19-.8.2-.2-.39-.28-.59-.39-.8-.18-.19-.37-.3-.57-.37-.76-.02-1.53.05-2.09.05-.51.05-1.03.19-1.42.64-.45.45-.75.8-1.07-1.07C11.27 3.9 9.35 2.01 7.07 2.01c-.34 0-.67.03-1 .1-.97.06-.33.13-.65.21-.97-.28-.33-.13-.65-.21-.97-.28C5.23 6.5 4 8.5 4 11s1.23 4.5 3.06 6.25c.26.19.53.4.82.59.45.11.9.11 1.36.11s.91-.11 1.36-.11c.29-.05.59-.15.82-.59-.29-.04-.59-.11-.82-.21-.33-.13-.65-.21-.97-.28-.34-.13-.65-.21-.97-.28-.32-.13-.65-.21-.97-.28-.26-.19-.53-.4-.82-.59-.44-.11-.9-.11-1.36-.11-.46 0-.91.11-1.36.11-.34.05-.67.03-1 .1-.97.06-.33.13-.65.21-.97-.28-.33-.13-.65-.21-.97-.28-.35-.13-.65-.21-.97-.28-.26-.19-.53-.4-.82-.59-.45-.11-.9-.11-1.36-.11s-.91.11-1.36.11c-.34.05-.67.03-1 .1-.97.06-.33.13-.65.21-.97-.28-.35-.13-.65-.21-.97-.28C3.23 16.5 2 18.5 2 21s1.23 4.5 3.06 6.25c.26.19.53.4.82.59.45.11.9.11 1.36.11s.91-.11 1.36-.11c.29-.05.59-.15.82-.59.29-.04-.59-.11-.82-.21-.33-.13-.65-.21-.97-.28-.34-.13-.65-.21-.97-.28-.32-.13-.65-.21-.97-.28-.26-.19-.53-.4-.82-.59-.44-.11-.9-.11-1.36-.11-.46 0-.91.11-1.36.11-.34.05-.67.03-1 .1-.97.06-.33.13-.65.21-.97-.28-.33-.13-.65-.21-.97-.28-.35-.13-.65-.21-.97-.28-.26-.19-.53-.4-.82-.59-.45-.11-.9-.11-1.36-.11s-.91.11-1.36.11c-.34.05-.67.03-1 .1-.97.06-.33.13-.65.21-.97-.28-.35-.13-.65-.21-.97-.28-.32-.13-.65-.21-.97-.28-.26-.19-.53-.4-.82-.59z"/>
	</svg>
);

const ShareComponent = ({ elementToCapture, fileName = "screenshot" }) => {
	const theme = useTheme();
	const captureAndShare = async () => {
		try {
			// Temporarily apply styles directly to the element
			const originalBackground = elementToCapture.current.style.background;
			const originalPadding = elementToCapture.current.style.padding;

			elementToCapture.current.style.background = `radial-gradient(circle, ${theme.palette.gradient.color1}, ${theme.palette.gradient.color2}, ${theme.palette.gradient.color3}, ${theme.palette.gradient.color4}, ${theme.palette.gradient.color5})`;
			elementToCapture.current.style.padding = `${theme.spacing(20)}`;

			// Capture the element directly
			const canvas = await html2canvas(elementToCapture.current, {
				useCORS: true,
				scale: 2,
				allowTaint: true,
				backgroundColor: null,
			});

			// Restore original styles
			elementToCapture.current.style.background = originalBackground;
			elementToCapture.current.style.padding = originalPadding;

			const imageBlob = await new Promise((resolve) =>
				canvas.toBlob(resolve, "image/png")
			);

			const file = new File([imageBlob], `${fileName}.png`, {
				type: "image/png",
			});

			if (navigator.share) {
				await navigator.share({
					files: [file],
					title: "Screenshot",
					text: "Check out this screenshot!",
				});
			} else {
				const url = URL.createObjectURL(imageBlob);
				const a = document.createElement("a");
				a.href = url;
				a.download = `${fileName}.png`;
				a.click();
				URL.revokeObjectURL(url);
			}
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<Button
			variant="outlined"
			startIcon={<ShareIcon sx={{ color: theme.palette.success.main }} />}
			color="success"
			onClick={captureAndShare}
		>
			Share
		</Button>
	);
};

export default ShareComponent;
