/* eslint-disable camelcase */
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './signuplogin.css';
const SignupLogin = ({
	setLoggedIn,
	setUser,
	action,
	setAction,
	setShowSignUpLogin
}) => {
	// const [action, setAction] = useState('Login');
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [token, setToken] = useState(
		localStorage.getItem('contactAppUserToken')
	);
	
	const newUser = { firstname, lastname, email, password };
	const user = { email, password };

	const optionsBody = action === 'Login' ? user : newUser;
	const endPoint = action === 'Login' ? 'user/login' : 'user';

	const clearFields = () => {
		// e.preventDefault();
		setFirstname('');
		setLastname('');
		setEmail('');
		setPassword('');
		setConfirmPassword('');
	};

	const handleSignUp = async e => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert('Password must match Confirm password');
			return;
		}

		if (Object.values(newUser).includes('')) {
			alert('fill in all fields');
			return;
		}
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newUser)
		};
		try {
			const res = await fetch(
				'http://localhost:8000/user/register',
				requestOptions
			);
			console.log(res);
			const data = await res.json();
			setShowSignUpLogin(show => !show);
            alert(data.message);
		} catch (err) {
			console.log(err);
		}
	};
	const handleLogin = async e => {
		e.preventDefault();
		if (Object.values(user).includes('')) {
			alert('fill in all fields');
			return;
		}
		
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		};
		try {
			const response = await fetch(
				'http://localhost:8000/user/login',
				requestOptions
			);
			if (!response.ok) {
				setToken(null);
                setShowSignUpLogin(show => !show);
				throw new Error('Invalid Credentials');
			}
			const data = await response.json();
			localStorage.setItem('contactAppUserToken', data.access_token);
			setUser(data.user);
			setToken(localStorage.getItem('Token'));
			setLoggedIn(prev => !prev);
			setShowSignUpLogin(show => !show);
		} catch (error) {
			alert(error);
		}
	};

	const capitalize = str => {
		if (str === '') return;
		return str.at(0).toUpperCase() + str.slice(1).toLowerCase();
	};

	return (
		<>
			<div className="signup-login-modal">
				<form
					className="login-signup-container"
					onSubmit={action === 'Login' ? handleLogin : handleSignUp}
					name="login-signup-form"
				>
					<div className="close-btn-container">
						<div
							className="close-btn"
							onClick={() => setShowSignUpLogin(show => !show)}
						>
							X
						</div>
					</div>
					<div className="action-header">
						<div className="text">{action}</div>
						<div className="state-container">
							<div
								className={
									action === 'Login'
										? 'action-state'
										: 'action-state action-inactive'
								}
								onClick={() => setAction('Login')}
							>
								login
							</div>
							<div
								className={
									action === 'Login'
										? 'action-state action-inactive'
										: 'action-state'
								}
								onClick={() => setAction('Sign up')}
							>
								sign up
							</div>
						</div>
					</div>
					<div className="inputs">
						{action !== 'Login' && (
							<div className="input">
								<img src={user_icon} alt="" />
								<input
									type="text"
									name="firstname"
									placeholder="Firstname"
									value={firstname}
									onChange={e => setFirstname(capitalize(e.target.value))}
								/>
							</div>
						)}

						{action !== 'Login' && (
							<div className="input">
								<img src={user_icon} alt="" />
								<input
									type="text"
									name="lastname"
									placeholder="Lastname"
									value={lastname}
									onChange={e => setLastname(capitalize(e.target.value))}
								/>
							</div>
						)}
						<div className="input">
							<img src={email_icon} alt="" />
							<input
								type="email"
								name="email"
								placeholder="Email"
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</div>
						<div className="input">
							<img src={password_icon} alt="" />
							<input
								type="password"
								name="password"
								placeholder="Password"
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
						</div>

						{action !== 'Login' && (
							<div className="input">
								<img src={password_icon} alt="" />
								<input
									type="password"
									name="Confirm Password"
									placeholder="Confirm Password"
									value={confirmPassword}
									onChange={e => setConfirmPassword(e.target.value)}
								/>
								{password === confirmPassword && password !== '' && (
									<span>✔️</span>
								)}
							</div>
						)}
					</div>
					<div className="submit-btn">
						<button className="ls-btn" type="button" onClick={clearFields}>
							Clear
						</button>
						<button className="ls-btn" type="submit">
							{action === 'Login' ? 'Login' : 'Sign up'}
						</button>
					</div>
					<div className="forgot-password">
						Forgot Password?
						<span>
							<Link to={'/forgot-password'}>Click Here</Link>
						</span>
					</div>
				</form>
			</div>
		</>
	);
};

export default SignupLogin;
