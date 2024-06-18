const Contact = ({ contact, setSelectedContact }) => {
	return (
		<li onClick={() => setSelectedContact(contact)}>
			<img src={contact.imgURL} alt={contact.firstname} />
			<h3>
				{contact.firstname} {contact.lastname}
			</h3>
			<div>
				<span>📱</span>
				<span>{contact.mobile}</span>
			</div>
		</li>
	);
};

export default Contact;
