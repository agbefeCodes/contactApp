import { Link } from 'react-router-dom';
import { Logo, Search } from './index';

function NavBar({
	showSignUpLogin,
	setShowSignUpLogin,
	setAction,
	setLoggedIn,
	loggedIn,
	setQuery,
	query,
	signOut,
	user,
    setToHome,
    setLoadingShowCase
}) {
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
				<Logo setLoggedIn={setLoggedIn} setToHome={setToHome} setLoadingShowCase={setLoadingShowCase}/>
				{loggedIn && <Search setQuery={setQuery} query={query} />}
				<div className="list-links">
					{/* <div className="dev-box"></div> */}
					<ul>
						{loggedIn && (
							<li onClick={() => setToHome(false)}>
								contacts
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
						<span className="sign-out" onClick={signOut}>
							sign-out
						</span>
					)}
					<span className="user-welcome">
						{loggedIn ? 'Welcome ' + user : ''}
					</span>
				</div>
			</div>
		</div>
	);
}

export default NavBar;
