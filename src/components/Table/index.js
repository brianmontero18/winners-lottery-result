import { useIsFetchingWinningNumbers } from '../../api';
import { useTable } from 'react-table';
import './index.css';

const defaultGetRowId = (row) => row.tier;
const defaultData = [];

export default function Table({ data = defaultData }) {
	const isFetching = useIsFetchingWinningNumbers();

	const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
		useTable({
			columns,
			data,
			getRowId: defaultGetRowId,
		});

	return (
		<div className="lottoland-table-container">
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup, headerGroupIndex) => (
						<tr
							{...headerGroup.getHeaderGroupProps()}
							key={`header_group_column_${headerGroupIndex}`}
						>
							{headerGroup.headers.map((column, columnIndex) => (
								<th
									{...column.getHeaderProps()}
									key={`header_column_${columnIndex}`}
								>
									{column.render('Header')}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{!isFetching
						? rows?.map((row, rowIndex) => {
								prepareRow(row);

								return (
									<tr
										{...row.getRowProps()}
										key={`body_row_${rowIndex}`}
									>
										{row.cells.map((cell, cellIndex) => (
											<td
												{...cell.getCellProps({
													className:
														'lottoland-table-body-text',
												})}
												key={`body_cell_${cellIndex}`}
											>
												{cell.render('Cell')}
											</td>
										))}
									</tr>
								);
						  })
						: null}
					{isFetching ? (
						/** LOADING SKELETON **/
						<>
							{[...Array(13).keys()].map((_, rowIndex) => (
								<tr
									{...headerGroups[
										headerGroups.length - 1
									].getHeaderGroupProps()}
									key={`loading_body_row_${rowIndex}`}
								>
									{headerGroups[
										headerGroups.length - 1
									].headers.map((cell, cellIndex) => (
										<td
											{...cell.getHeaderProps({
												className:
													'lottoland-table-body-text',
											})}
											key={`loading_body_cell_${cellIndex}`}
										>
											<div className="lottoland-skeleton-line"></div>
										</td>
									))}
								</tr>
							))}
						</>
					) : null}
				</tbody>
			</table>
		</div>
	);
}

const columns = [
	{
		Header: 'Tier',
		accessor: 'tier',
	},
	{
		Header: 'Match',
		accessor: 'match',
	},
	{
		Header: 'Winners',
		accessor: 'winners',
		Cell: ({ row }) => `${row.values.winners}x`,
	},
	{
		Header: 'Amount',
		accessor: 'prize',
		Cell: ({ row }) => formatCurrency({ number: row.values.prize }),
	},
];

function formatCurrency({ number, currency = 'EUR' }) {
	return number.toLocaleString('en-US', {
		style: 'currency',
		currency,
	});
}
