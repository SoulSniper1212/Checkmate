import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@/Components/v3/ui";
import SkeletonLayout from "./skeleton.jsx";
import PropTypes from "prop-types";

// Custom Tooltip component
const Tooltip = ({ title, children, followCursor = false, enterDelay = 500, enterNextDelay = 500, slotProps = {} }) => {
	if (!title) return children;

	return (
		<div className="relative group">
			{children}
			{title && (
				<div
					className="absolute z-50 invisible group-hover:visible bg-gray-900 text-white text-sm rounded-lg px-3 py-2 whitespace-nowrap transition-opacity duration-200"
					style={{
						bottom: '100%',
						left: '50%',
						transform: 'translateX(-50%) translateY(-8px)',
						opacity: slotProps?.tooltip?.sx?.background === 'unset' ? 0.9 : 1,
						marginLeft: followCursor ? '50px' : '0'
					}}
				>
					{title}
					<div
						className="absolute w-2 h-2 bg-gray-900 transform rotate-45"
						style={{
							bottom: '-4px',
							left: '50%',
							marginLeft: '-4px'
						}}
					/>
				</div>
			)}
		</div>
	);
};

// Custom TableContainer component
const TableContainer = ({ component: Component = "div", children, className, ...props }) => {
	const Container = Component;
	return (
		<Container className={`border border-gray-200 rounded-lg overflow-hidden ${className || ''}`} {...props}>
			{children}
		</Container>
	);
};

/**
 * @typedef {Object} Header
 * @property {number|string} id - The unique identifier for the header.
 * @property {React.ReactNode} content - The content to display in the header cell.
 * @property {Function} onClick - A function to be called when this cell is clicked, receiving the event and row data as an argument.
 * @property {Object} getCellSx - Function that takes a row and returns a style object for the table cell.
 * @property {Function} render - A function to render the cell content for a given row.
 */

/**
 * @typedef {Object} Config
 * @property {Function} onRowClick - A function to be called when a row is clicked, receiving the row data as an argument.
 * @property {Object} rowSX - Style object for the table row.
 */

/**
 * DataTable component renders a table with headers and data.
 *
 * @param {Object} props - The component props.
 * @param {Header[]} props.headers - An array of header objects, each containing an `id`, `content`, and `render` function.
 * @param {Array} props.data - An array of data objects, each representing a row.
 * @returns {JSX.Element} The rendered table component.
 */

const DataTable = ({
	shouldRender = true,
	headers = [],
	data = [],
	config = {
		emptyView: "No data",
		tooltipContent: null,
		onRowClick: () => {},
	},
}) => {
	if (!shouldRender) {
		return <SkeletonLayout />;
	}

	if ((headers?.length ?? 0) === 0) {
		return "No data";
	}

	return (
		<TableContainer component="div" className="bg-white">
			<Table className="w-full">
				<TableHead className="sticky top-0 z-10">
					<TableRow className="bg-blue-600">
						{headers.map((header, index) => (
							<TableCell
								key={header.id}
								className={`px-8 py-4 text-white font-semibold ${
									index === 0 ? 'text-left' : 'text-center'
								}`}
							>
								{header.content}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{(data?.length ?? 0) === 0 ? (
						<TableRow>
							<TableCell
								colSpan={headers.length}
								className="text-center py-8 text-gray-500"
							>
								{config.emptyView}
							</TableCell>
						</TableRow>
					) : (
						data.map((row) => {
							const key = row.id || row._id || Math.random();
							return (
								<Tooltip
									key={key}
									followCursor={false}
									title={
										typeof config.tooltipContent === "function"
											? config.tooltipContent(row)
											: config.tooltipContent
									}
									slotProps={{
										tooltip: {
											sx: {
												background: "unset",
											},
										},
									}}
								>
									<TableRow
										className={`hover:bg-gray-50 cursor-pointer ${
											config?.rowSX ? '' : 'border-b border-gray-100'
										}`}
										style={config?.rowSX ?? {}}
										onClick={config?.onRowClick ? () => config.onRowClick(row) : null}
									>
										{headers.map((header, index) => {
											return (
												<TableCell
													className={`px-8 py-4 text-gray-800 ${
														index === 0 ? 'text-left' : 'text-center'
													}`}
													key={header.id}
													onClick={header.onClick ? (e) => header.onClick(e, row) : null}
													style={header.getCellSx ? header.getCellSx(row) : {}}
												>
													{header.render(row)}
												</TableCell>
											);
										})}
									</TableRow>
								</Tooltip>
							);
						})
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

DataTable.propTypes = {
	shouldRender: PropTypes.bool,
	headers: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
			content: PropTypes.node.isRequired,
			render: PropTypes.func.isRequired,
		})
	).isRequired,
	data: PropTypes.array,
	config: PropTypes.shape({
		onRowClick: PropTypes.func,
		rowSX: PropTypes.object,
		emptyView: PropTypes.node,
	}),
};

export default DataTable;
