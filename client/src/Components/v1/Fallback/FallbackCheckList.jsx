import PropTypes from "prop-types";
import { Box, Stack } from "@/Components/v3/ui";
import Check from "../Check/Check.jsx";
const FallbackCheckList = ({ checks, type }) => {
	return (
		<Box
			className="flex flex-wrap gap-2 items-start max-w-[75%] md:max-w-[80%] xs:max-w-[90%]"
		>
			{checks?.map((check, index) => (
				<Check
					text={check}
					key={`${type.trim().split(" ")[0]}-${index}`}
					outlined={true}
				/>
			))}
		</Box>
	);
};

FallbackCheckList.propTypes = {
	checks: PropTypes.arrayOf(PropTypes.string).isRequired,
	title: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
};

export default FallbackCheckList;
