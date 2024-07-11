import { NavBar, ShowCase, Main } from './components/index';
import './App.css';
import Contacts from './pages/Contacts';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
function App() {
	const [showSignUpLogin, setShowSignUpLogin] = useState(false);
	const [action, setAction] = useState('Login');
	const [user, setUser] = useState('');
	const [token, setToken] = useState(
		localStorage.getItem('contactAppUserToken')
	);
	const [loggedIn, setLoggedIn] = useState(false);
	const [query, setQuery] = useState('');
	const [countryId, setCountryId] = useState(1);
	useEffect(() => {
		localStorage.setItem('contactAppUserToken', null);
	}, []);
	// console.log('App Token', token);
	const signOut = () => {
		localStorage.setItem('contactAppUserToken', null);
		setLoggedIn(prev => !prev);
	};

	return (
		<>
			<NavBar
				showSignUpLogin={showSignUpLogin}
				setShowSignUpLogin={setShowSignUpLogin}
				action={action}
				setAction={setAction}
				setLoggedIn={setLoggedIn}
				loggedIn={loggedIn}
				setQuery={setQuery}
				query={query}
				signOut={signOut}
				user={user}
			/>
			<Main>
				{loggedIn ? (
					<Contacts
						query={query}
						signOut={signOut}
						countryId={countryId}
						setCountryId={setCountryId}
					/>
				) : (
					<ShowCase
						showSignUpLogin={showSignUpLogin}
						setShowSignUpLogin={setShowSignUpLogin}
						action={action}
						setAction={setAction}
						setUser={setUser}
						setToken={setToken}
						setLoggedIn={setLoggedIn}
					/>
				)}
			</Main>
		</>
	);
}

export default App;
