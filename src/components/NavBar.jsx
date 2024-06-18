import { Link } from 'react-router-dom';
import { Logo } from './index';

// const element = (
// 	<FontAwesomeIcon
// 		icon="fa-solid fa-address-book"
// 		style={{ color: '#f07605' , fontSize:'30px'}}
// 	/>
// );

function NavBar({
	showSignUpLogin,
	setShowSignUpLogin,
	setAction,
	setLoggedIn,
	loggedIn,
	action
}) {
	return (
		<div id="nav-container">
			<div className="navbar">
				<Logo setLoggedIn={setLoggedIn} />
				<div className="list-links">
					{/* <div className="dev-box"></div> */}
					<ul>
						{loggedIn && (
							<li onClick={() => setLoggedIn(true)}>
								<Link to={'/pages/contacts'}>contacts</Link>
							</li>
						)}
						{!showSignUpLogin && (
							<li
								onClick={() => {
									setShowSignUpLogin(show => !show);
									setAction('Login');
								}}
							>
								{!loggedIn && 'login'}
							</li>
						)}
					</ul>
					{!loggedIn && (
						<button
							className="sign-up-btn"
							onClick={() => {
								setShowSignUpLogin(show => !show);
								setAction('Sign-up');
							}}
						>
							Create Account
						</button>
					)}
					{loggedIn && (
						<span
							className="meet-dev"
							onClick={() => {
								localStorage.setItem('contactAppUserToken', null);
								setLoggedIn(prev => !prev);
							}}
						>
							sign-out
						</span>
					)}
					<span className="meet-dev">developer </span>
				</div>
			</div>
		</div>
	);
}

export default NavBar;
