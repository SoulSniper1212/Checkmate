import PropTypes from "prop-types";
import { Stack, TablePagination, Typography } from "@/Components/v3/ui";
import { TablePaginationActions } from "./Actions/index.jsx";
import SelectorVertical from "../../../../assets/icons/selector-vertical.svg?react";

Pagination.propTypes = {
	paginationLabel: PropTypes.string, // Label for the pagination.
	itemCount: PropTypes.number, // Total number of items for pagination.
	page: PropTypes.number, // Current page index.
	rowsPerPage: PropTypes.number, // Number of rows displayed per page.
	handleChangePage: PropTypes.func.isRequired, // Function to handle page changes.
	handleChangeRowsPerPage: PropTypes.func, // Function to handle changes in rows per page.
};

const ROWS_PER_PAGE_OPTIONS = [5, 10, 15, 25];

// Determine whether pagination buttons should be shown
const shouldShowPaginationButtons = (itemCount, rowsPerPage) => {
	return Math.ceil(itemCount / rowsPerPage) > 1;
};

// Empty action component for pagination (no-op component)
const EmptyPaginationActions = () => <div />;

/**
 * Pagination component for table navigation with customized styling and behavior.
 *
 * @param {object} props - Component properties.
 * @param {string} props.paginationLabel - Label for the pagination.
 * @param {number} props.monitorCount - Total number of monitors to paginate.
 * @param {number} props.page - Current page index (0-based).
 * @param {number} props.rowsPerPage - Number of rows to display per page.
 * @param {function} props.handleChangePage - Callback for handling page changes.
 * @param {function} props.handleChangeRowsPerPage - Callback for handling changes to rows per page.
 * @returns {JSX.Element} The Pagination component.
 */
function Pagination({
	paginationLabel,
	itemCount = 0,
	page = 0,
	rowsPerPage = 5,
	handleChangePage,
	handleChangeRowsPerPage,
}) {
	const start = page * rowsPerPage + 1;
	const end = Math.min(page * rowsPerPage + rowsPerPage, itemCount);
	const range = `${start} - ${end}`;

	const showPaginationButtons = shouldShowPaginationButtons(itemCount, rowsPerPage);

	return (
		<Stack
			direction="row"
			alignItems="center"
			justifyContent="space-between"
			className="px-16 mt-2"
		>
			<Typography
				className="px-8 opacity-70 text-sm"
			>
				Showing {range} of {itemCount} {paginationLabel}
			</Typography>
			<TablePagination
				component="div"
				count={itemCount}
				page={page}
				onPageChange={handleChangePage}
				rowsPerPage={rowsPerPage}
				rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
				onRowsPerPageChange={handleChangeRowsPerPage}
				ActionsComponent={
					showPaginationButtons ? TablePaginationActions : EmptyPaginationActions
				}
				labelRowsPerPage="Rows per page"
				labelDisplayedRows={({ page, count }) =>
					`Page ${page + 1} of ${Math.max(0, Math.ceil(count / rowsPerPage))}`
				}
				slotProps={{
					select: {
						MenuProps: {
							keepMounted: true,
							disableScrollLock: true,
							PaperProps: {
								className: "pagination-dropdown",
							},
							transformOrigin: { vertical: "bottom", horizontal: "left" },
							anchorOrigin: { vertical: "top", horizontal: "left" },
						},
						inputProps: { id: "pagination-dropdown" },
						IconComponent: SelectorVertical,
						className: "ml-16 mr-48 min-w-20 text-left",
					},
				}}
				className="text-gray-600"
			/>
		</Stack>
	);
}

export default Pagination;
