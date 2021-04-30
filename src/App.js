import Table from './components/Table';
import Results from './components/Results';
import SidePanel from './components/SidePanel';
import useWinningNumbers from './hooks/useWinningNumbers';
import { ReactComponent as LottolandLogo } from './assets/lottoland_logo.svg';
import './App.css';

export default function App() {
	const { data } = useWinningNumbers();

	return (
		<>
			<header className="lottoland-header-container">
				<a
					href="/"
					title="Play Lotto Online and win Millions at Lottoland.com"
				>
					<LottolandLogo className="lottoland-header-logo" />
				</a>
			</header>
			<main className="lottoland-main-container">
				<Results
					date={data?.date}
					numbers={data?.lotteryBalls?.numbers}
					euroNumbers={data?.lotteryBalls?.euroNumbers}
				/>
				<section className="lottoland-details-container">
					<Table data={data?.tableData} />
					<SidePanel
						date={data?.date}
						number={data?.number}
						time={data?.time}
					/>
				</section>
			</main>
		</>
	);
}
