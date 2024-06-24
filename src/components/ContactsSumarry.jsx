const ContactsSummary = ({ contacts, setAddEditModal , setAction}) => {
	return (
		<>
			<div className="summary">
				<h2>Contacts Summary</h2>
				<div>
					<p>Number of Contacts:{contacts?.length}</p>
					<button
						className="btn-summary"
						onClick={() => {
                            setAction('Add')
                            setAddEditModal(prev => !prev)}}
					>
						New Contact
					</button>
				</div>
			</div>
		</>
	);
};

export default ContactsSummary;
