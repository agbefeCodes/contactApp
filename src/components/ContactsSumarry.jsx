const ContactsSummary = ({
	setAddEditModal,
	setAction,
	listLength,
	setCountryId
}) => {
	return (
		<>
			<div className="summary">
				<h2>Contacts Summary</h2>
				<div>
					<p>Number of Contacts: {listLength}</p>
					<div className="add-contact">
						<button
							className="btn-summary"
							onClick={() => {
								setAction('Add');
								setCountryId(1);
								setAddEditModal(prev => !prev);
							}}
						>
							New Contact
						</button>
						{listLength < 1 && <p>👈🏻 Add a Contact</p>}
					</div>
				</div>
			</div>
		</>
	);
};

export default ContactsSummary;
