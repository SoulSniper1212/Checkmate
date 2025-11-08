import { RowContainer } from "../StandardContainer/index.jsx";
import { Stack, Typography } from "@/Components/v3/ui";
import Image from "../Image/index.jsx";

const InfoBox = ({
	img,
	icon: Icon,
	alt,
	heading,
	headingLevel = 2,
	subHeading,
	subHeadingLevel = "",
	className,
}) => {
	return (
		<RowContainer className={className}>
			{img && (
				<Image
					src={img}
					height={"30px"}
					width={"30px"}
					alt={alt}
					className="mr-8"
				/>
			)}
			{Icon && (
				<Icon className="w-[30px] h-[30px] mr-8" />
			)}
			<Stack>
				<Typography variant={`h${headingLevel}`}>{heading}</Typography>
				<Typography variant={subHeadingLevel ? `h${subHeadingLevel}` : "p"}>
					{subHeading}
				</Typography>
			</Stack>
		</RowContainer>
	);
};

export default InfoBox;
