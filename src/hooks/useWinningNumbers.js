import { useQuery, useIsFetching } from 'react-query';

const RESULT_WINNING_NUMBERS_KEY = 'result-winning-numbers';

export default function useWinningNumbers() {
	return useQuery({
		queryKey: RESULT_WINNING_NUMBERS_KEY,
		queryFn,
		select: getLastJackpotResult,
		refetchOnWindowFocus: false,
		notifyOnChangeProps: 'tracked',
	});
}

export function useIsFetchingWinningNumbers() {
	return useIsFetching([RESULT_WINNING_NUMBERS_KEY]);
}

async function queryFn() {
	return fetch('/api/drawings/euroJackpot').then((res) => res.json());
}

function getLastJackpotResult(res) {
	return Object.keys(euroJackpotOdds).reduce(
		(acc, cur) => ({
			...acc,
			tableData: acc.tableData.concat({
				...euroJackpotOdds[cur],
				...res.last.odds[cur],
			}),
		}),
		{
			number: res.last.nr,
			lotteryBalls: {
				numbers: res.last.numbers,
				euroNumbers: res.last.euroNumbers,
			},
			tableData: [],
			date: res.last.drawingDate.split(', ')[0],
			time: res.last.drawingDate.split(', ')[1],
		}
	);
}

const euroJackpotOdds = {
	rank1: {
		tier: 'I',
		match: '5 Numbers + 2 Euronumbers',
	},
	rank2: {
		tier: 'II',
		match: '5 Numbers + 1 Euronumber',
	},
	rank3: {
		tier: 'III',
		match: '5 Numbers + 0 Euronumbers',
	},
	rank4: {
		tier: 'IV',
		match: '4 Numbers + 2 Euronumbers',
	},
	rank5: {
		tier: 'V',
		match: '4 Numbers + 1 Euronumber',
	},
	rank6: {
		tier: 'VI',
		match: '4 Numbers + 0 Euronumber',
	},
	rank7: {
		tier: 'VII',
		match: '3 Numbers + 2 Euronumbers',
	},
	rank8: {
		tier: 'VIII',
		match: '2 Numbers + 2 Euronumbers',
	},
	rank9: {
		tier: 'IX',
		match: '3 Numbers + 1 Euronumber',
	},
	rank10: {
		tier: 'X',
		match: '3 Numbers + 0 Euronumbers',
	},
	rank11: {
		tier: 'XI',
		match: '1 Number + 2 Euronumbers',
	},
	rank12: {
		tier: 'XII',
		match: '2 Numbers + 1 Euronumber',
	},
};
