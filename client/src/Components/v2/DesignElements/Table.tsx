import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TablePagination, Box, IconButton } from "@/Components/v3/ui";
import type { TablePaginationProps } from "@/Components/v3/ui/table";
import { ChevronLast, ChevronFirst, ChevronLeft, ChevronRight } from "lucide-react";
export type Header<T> = {
	id: number | string;
	content: React.ReactNode;
	onClick?: (event: React.MouseEvent<HTMLTableCellElement | null>, row: T) => void;
	render: (row: T) => React.ReactNode;
};

type DataTableProps<T extends { id?: string | number; _id?: string | number }> = {
	headers: Header<T>[];
	data: T[];
	onRowClick?: (row: T) => void;
};

export function DataTable<
	T extends {
		id?: string | number;
		_id?: string | number;
		onRowClick?: (row: T) => void;
	},
>({ headers, data, onRowClick }: DataTableProps<T>) {
	if (data.length === 0 || headers.length === 0) return <div>No data</div>;
	return (
		<TableContainer>
			<Table
				stickyHeader
				className="[&_thead_th]:bg-secondary [&_thead_th]:text-secondary-foreground [&_thead_th]:font-semibold [&_tbody_td]:bg-background [&_tbody_td]:text-muted-foreground [&_tbody_tr:last-child_td]:border-b-0 [&_th_&]:pl-8 [&_td]:pl-8"
			>
				<TableHead>
					<TableRow>
						{headers.map((header, idx) => {
							return (
								<TableCell
									align={idx === 0 ? "left" : "center"}
									key={header.id}
								>
									{header.content}
								</TableCell>
							);
						})}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((row) => {
						const key = row.id || row._id || Math.random();

						return (
							<TableRow
								key={key}
								className={onRowClick ? "cursor-pointer" : "cursor-default"}
								onClick={() => (onRowClick ? onRowClick(row) : null)}
							>
								{headers.map((header, index) => {
									return (
										<TableCell
											align={index === 0 ? "left" : "center"}
											key={header.id}
											onClick={
												header.onClick ? (e) => header.onClick!(e, row) : undefined
											}
										>
											{header.render(row)}
										</TableCell>
									);
								})}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

interface TablePaginationActionsProps {
	count: number;
	page: number;
	rowsPerPage: number;
	onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
	const { count, page, rowsPerPage, onPageChange } = props;

	const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onPageChange(event, 0);
	};

	const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<Box
			className="flex-shrink-0 ml-2.5 table-pagination-actions"
		>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
			>
				<ChevronFirst />
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="previous page"
			>
				<ChevronLeft />
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				<ChevronRight />
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				<ChevronLast />
			</IconButton>
		</Box>
	);
}

export const Pagination: React.FC<TablePaginationProps> = ({ ...props }) => {
	return (
		<TablePagination
			ActionsComponent={TablePaginationActions}
			rowsPerPageOptions={[5, 10, 25]}
			{...props}
			className="[&_div_[role=toolbar]]:grid sm:[&_div_[role=toolbar]]:flex [&_div_[role=toolbar]]:grid-cols-2 [&_div_[role=toolbar]]:gap-4 [&_label]:col-start-1 [&_label]:row-start-1 [&_label]:justify-self-center [&_select]:col-start-2 [&_select]:row-start-1 [&_select]:justify-self-center [&_p]:col-start-2 [&_p]:row-start-2 [&_p]:justify-self-center [&_.table-pagination-actions]:col-start-1 [&_.table-pagination-actions]:row-start-2 [&_.table-pagination-actions]:justify-self-center [&_select]:border [&_select]:border-border [&_select]:rounded-md"
		/>
	);
};
