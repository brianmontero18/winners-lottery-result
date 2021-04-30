import { useIsFetchingWinningNumbers } from '../../hooks/useWinningNumbers';
import { ReactComponent as PlusIcon } from '../../assets/plus_icon.svg';
import './index.css';

const defaultNumbers = [1, 2, 3, 4, 5];
const defaultEuroNumbers = [1, 2];

export default function Results({
	date,
	numbers = defaultNumbers,
	euroNumbers = defaultEuroNumbers,
}) {
	const isFetching = useIsFetchingWinningNumbers();

	return (
		<>
			<header class="lottoland-title">
				<h1>EuroJackpot Results &amp; Winning Numbers</h1>
			</header>
			<section>
				<div className="lottoland-eurojackpot-results">
					{isFetching ? (
						<div
							className="lottoland-skeleton-line"
							style={{ height: '10px' }}
						></div>
					) : (
						<>
							<span style={{ color: 'rgb(202, 127, 38)' }}>
								EuroJackpot
							</span>{' '}
							Results for {toLongDate(date)}{' '}
						</>
					)}
				</div>
				<div className="lottoland-results-numbers">
					{numbers.map((num, i) => (
						<LotteryBall
							key={`default-${i}`}
							value={num}
							isFetching={isFetching}
						/>
					))}
					<PlusIcon className="lottoland-plus-icon" />
					{euroNumbers.map((num, i) => (
						<LotteryBall
							key={`euro-${i}`}
							type="euro"
							value={num}
							isFetching={isFetching}
						/>
					))}
				</div>
			</section>
		</>
	);
}

function LotteryBall({ type = 'default', value, isFetching }) {
	return (
		<>
			{isFetching ? (
				<div className="circle lottoland-skeleton-circle"></div>
			) : (
				<div
					className="circle"
					style={{
						border:
							type === 'euro'
								? '1px solid rgb(202, 127, 38)'
								: '1px solid #d9deda',
					}}
				>
					{value}
				</div>
			)}
		</>
	);
}

function toLongDate(time = '.') {
	return new Date(time.split('.').reverse().join('-')).toLocaleString(
		'en-US',
		{
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			timeZone: 'UTC',
		}
	);
}
