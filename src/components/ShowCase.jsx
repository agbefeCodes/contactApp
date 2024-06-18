import SignupLogin from './signuplogin/SignupLogin';

function ShowCase({
	showSignUpLogin,
	setShowSignUpLogin,
	action,
	setAction,
	setUser,
    setToken,
    setLoggedIn
}) {
	return (
		<>
			<div id="showcase">
				{showSignUpLogin && (
					<SignupLogin
						setShowSignUpLogin={setShowSignUpLogin}
						action={action}
						setAction={setAction}
						setUser={setUser}
                        setToken={setToken}
                        setLoggedIn={setLoggedIn}
                        
					/>
				)}
				<div className="showcase-container">
					<div className="content">
						<h1>
							Get your <span>contacts</span> organized
						</h1>
						<p>
							Keep your contacts safe and secure. With ContactApp, you never
							have to worry about losing precious contacts again... and
							it&apos;s free
						</p>
						<button
							className="sign-up-btn"
							onClick={() => {
								setShowSignUpLogin(show => !show);
								setAction('Sign-up');
							}}
						>
							Start Here
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default ShowCase;
