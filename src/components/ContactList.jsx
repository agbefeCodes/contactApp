import { useEffect } from 'react';
import Contact from './Contact';

const ContactList = ({
	contactList,
	setSelectedContact,
	query,
	selectedContact
}) => {
	useEffect(() => {
		const contact = contactList
			.filter(contact => contact?.id === selectedContact?.id)
			.at(0);
		const cleanUp = setTimeout(() => {
			setSelectedContact(contact);
		}, 500);
		return () => clearTimeout(cleanUp);
	}, [contactList, selectedContact?.id, setSelectedContact]);

	const list = contactList
		.filter(
			contact =>
				contact.firstname.toLowerCase().includes(query) ||
				contact.lastname.toLowerCase().includes(query)
		)
		.sort((a, b) => {
			if (a[query] < b[query]) return -1;
			if (a[query] > b[query]) return 1;
			return 0;
		});

	return (
		<ul className="list">
			{list.map(contact => (
				<Contact
					contact={contact}
					key={contact.id}
					setSelectedContact={setSelectedContact}
					selectedContact={selectedContact}
				/>
			))}
		</ul>
	);
};

export default ContactList;
