import Contact from './Contact';

function ContactList({ contactList, setSelectedContact }) {
	
	return (
		<ul className="list">
			{contactList?.map(contact => (
				<Contact
					contact={contact}
					key={contact.id}
					setSelectedContact={setSelectedContact}
				/>
			))}
		</ul>
	);
}

export default ContactList;
