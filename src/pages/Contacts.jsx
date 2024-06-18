import { useState, useContext, useEffect } from 'react';
import { UserContacts } from '../components/context/UserContactsContext';
import {
	Main,
	NavBar,
	Box,
	ContactList,
	ContactDetails,
	ContactsSummary,
	AddEditModal
} from '../components/index';
import img1 from './imgs/lee.jpg';

const list = [
	{
		firstname: 'Agbefe',
		lastname: 'Ziregbe',
		mobile: '08078930820',
		id: 5047,
		imgURL: img1
	},
	{
		firstname: 'Elohor',
		lastname: 'Ziregbe',
		mobile: '08078930820',
		id: 5048,
		imgURL: img1
	},
	{
		firstname: 'John',
		lastname: 'Ziregbe',
		mobile: '08078930820',
		id: 5049,
		imgURL: img1
	},
	{
		firstname: 'Otee',
		lastname: 'Ziregbe',
		mobile: '08078930820',
		id: 5046,
		imgURL: img1
	},
	{
		firstname: 'Afure',
		lastname: 'Ziregbe',
		mobile: '08078930820',
		id: 5045,
		imgURL: img1
	},
	{
		firstname: 'Mena',
		lastname: 'Ziregbe',
		mobile: '08078930820',
		id: 5044,
		imgURL: img1
	},
	{
		firstname: 'Onome',
		lastname: 'Ziregbe',
		mobile: '08078930820',
		id: 5043,
		imgURL: img1
	},
	{
		firstname: 'Monigho',
		lastname: 'Ziregbe',
		mobile: '08078930820',
		id: 5042,
		imgURL: img1
	}
];
function Contacts() {
	const { contactList } = useContext(UserContacts);
	// console.log(contactList);
	const listEmpty =
		contactList.length < 1 ? 'No Contacts Found' : 'Contacts Loaded';
	const [selectedContact, setSelectedContact] = useState(null);
	const [addEditModal, setAddEditModal] = useState(false);
	const [action, setAction] = useState('Add');
	const [listLength, setListLength] = useState(listEmpty);
	const [token, setToken] = useState(localStorage.getItem('contactAppUserToken'));
	// console.log('Token', token);
	return (
		<>
			{/* <NavBar /> */}

			<Main>
				{addEditModal && (
					<AddEditModal action={action} setAddEditModal={setAddEditModal} />
				)}
				<Box listEmpty={listLength}>
					<ContactList
						contactList={list}
						setSelectedContact={setSelectedContact}
					/>
				</Box>
				<Box>
					<ContactsSummary setAddEditModal={setAddEditModal} />
					{selectedContact && (
						<ContactDetails
							selectedContact={selectedContact}
							setSelectedContact={setSelectedContact}
						/>
					)}
				</Box>
			</Main>
		</>
	);
}

export default Contacts;
