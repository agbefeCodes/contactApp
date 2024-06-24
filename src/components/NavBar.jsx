import { Link } from 'react-router-dom';
import { Logo } from './index';

function NavBar({
	showSignUpLogin,
	setShowSignUpLogin,
	setAction,
	setLoggedIn,
	loggedIn,
	action
}) {
	const signOut = () => {
		localStorage.setItem('contactAppUserToken', null);
		setLoggedIn(prev => !prev);
	};
	const showLoginBox = () => {
		setShowSignUpLogin(show => !show);
		setAction('Login');
	};
	const showSignUpBox = () => {
		setShowSignUpLogin(show => !show);
		setAction('Sign-up');
	};
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
							<li onClick={showLoginBox}>{!loggedIn && 'login'}</li>
						)}
					</ul>
					{!loggedIn && (
						<button className="sign-up-btn" onClick={showSignUpBox}>
							Create Account
						</button>
					)}
					{loggedIn && (
						<span className="meet-dev" onClick={signOut}>
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
