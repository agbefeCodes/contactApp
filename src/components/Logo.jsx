import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
const element = (
	<FontAwesomeIcon
		icon={faAddressCard}
		style={{ color: '#f07605', fontSize: '30px' }}
	/>
);
function Logo({ setToHome, setLoadingShowCase }) {
	const setLoader = () => {
		setToHome(true);
		setLoadingShowCase(true);
		setTimeout(() => setLoadingShowCase(false), 1000);
	};
	return (
		<div className="logo-container">
			<div className="logo" onClick={setLoader}>
				{element}
				<span className="logo-txt">ContactApp</span>
			</div>
		</div>
	);
}

export default Logo;
