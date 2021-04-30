import './index.css';

export default function SidePanel({ date, number, time }) {
	return (
		<div className="lottoland-results-container">
			<section className="lottoland-side-panel-card">
				<h2 className="lottoland-side-panel-card-title">
					The EuroJackpot numbers for {date}
				</h2>
				<p className="lottoland-side-panel-card-text">
					<strong style={{ fontWeight: '500' }}>
						The {toOrdinalSuffix(number)} draw for the EuroJackpot
						was held on {date}
					</strong>
					, as usual at {toNormalHours(time)} in Helsinki.
				</p>
			</section>
			<section className="lottoland-side-panel-card">
				<h2 className="lottoland-side-panel-card-title">
					The EuroJackpot numbers for {date}
				</h2>
				<p className="lottoland-side-panel-card-text">
					The balls used for the draw are made of a synthetic polymer,
					softer than ping-pong balls. The results are broadcast after
					the draw, with the draw-machines independently checked by
					the VTT Technical Research Center of Finland.
				</p>
				<p className="lottoland-side-panel-card-text">
					Lottoland published the draw results immediately after the
					draw on {date}.
				</p>
			</section>
		</div>
	);
}

function toOrdinalSuffix(i) {
	if (isNaN(i)) {
		return '';
	}

	const j = i % 10,
		k = i % 100;

	if (j === 1 && k !== 11) {
		return i + 'st';
	}
	if (j === 2 && k !== 12) {
		return i + 'nd';
	}
	if (j === 3 && k !== 13) {
		return i + 'rd';
	}

	return i + 'th';
}

function toNormalHours(time = ':') {
	let timeValue;
	const timeArray = time.split(':');
	const hours = Number(timeArray[0]);
	const minutes = Number(timeArray[1]);

	if (hours > 0 && hours <= 12) {
		timeValue = '' + hours;
	} else if (hours > 12) {
		timeValue = '' + (hours - 12);
	} else if (hours === 0) {
		timeValue = '12';
	}

	timeValue += minutes < 10 ? ':0' + minutes : ':' + minutes; // get minutes
	timeValue += hours >= 12 ? ' P.M.' : ' A.M.'; // get AM/PM

	return timeValue;
}
