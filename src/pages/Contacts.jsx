import { useState, useContext, useEffect } from 'react';
import {
	Main,
	Box,
	ContactList,
	ContactDetails,
	ContactsSummary,
	AddEditModal,
	DeleteModal
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
	// const [contactList, token]= useContext(UserContacts);
	// console.log(contactList , token);
	const [contactList, setContactList] = useState([]);
	const listEmpty =
		contactList.length < 1 ? 'No Contacts Found' : 'Contacts Loaded';

	const [selectedContact, setSelectedContact] = useState(null);
	const [addEditModal, setAddEditModal] = useState(false);
	const [action, setAction] = useState('Add');
	const [listLength, setListLength] = useState(listEmpty);
	const [listChange, setListChange] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [token, setToken] = useState(
		localStorage.getItem('contactAppUserToken')
	);
	// console.log(deleteModal);
	const handleDeleteContact = async id => {
		const requestOptions = {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${token}` }
		};
		try {
			await fetch(`http://localhost:8000/contacts/${id}`, requestOptions);
			setSelectedContact(null);
			setListChange(!listChange);
			setDeleteModal(false);
			alert('Contact Deleted Successfully');
		} catch (error) {
			alert(error);
		}
	};

	useEffect(() => {
		const GetList = async () => {
			// console.log('Im here');
			const requestOptions = {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			};
			try {
				const response = await fetch(
					'http://localhost:8000/contacts',
					requestOptions
				);
				if (!response.ok) {
					console.log(response);
					setContactList([]);
					// setToken(null);
					// localStorage.setItem('contactAppUserToken', token);
					throw new Error('Error Loading List');
				}

				const data = await response.json();
				console.log(data, token);
				setContactList(data);
			} catch (error) {
				console.log(error);
			}
		};
		GetList();
	}, [token, listChange]);

	return (
		<>
			<Main>
				{deleteModal && (
					<DeleteModal
						setDeleteModal={setDeleteModal}
						selectedContact={selectedContact}
						handleDeleteContact={handleDeleteContact}
					/>
				)}
				{addEditModal && (
					<AddEditModal
						action={action}
						setAddEditModal={setAddEditModal}
						token={token}
						setSelectedContact={setSelectedContact}
					/>
				)}
				<Box listEmpty={listLength}>
					<ContactList
						contactList={contactList}
						setSelectedContact={setSelectedContact}
					/>
				</Box>
				<Box>
					<ContactsSummary
						setAction={setAction}
						setAddEditModal={setAddEditModal}
					/>
					{selectedContact && (
						<ContactDetails
							selectedContact={selectedContact}
							setSelectedContact={setSelectedContact}
							deleteContact={handleDeleteContact}
							setDeleteModal={setDeleteModal}
							setAddEditModal={setAddEditModal}
							setAction={setAction}
						/>
					)}
				</Box>
			</Main>
		</>
	);
}

export default Contacts;
