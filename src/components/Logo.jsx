import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const element = (
	<FontAwesomeIcon
		icon={faAddressCard}
		style={{ color: '#f07605', fontSize: '30px' }}
	/>
);
function Logo({ setLoggedIn }) {
	return (
		<Link to={'/'}>
			<div className="logo-container">
				<div className="logo" onClick={() => setLoggedIn(false)}>
					{element}
					<span className="logo-txt">ContactApp</span>
				</div>
			</div>
		</Link>
	);
}

export default Logo;
