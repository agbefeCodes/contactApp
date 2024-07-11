import { useState, useEffect } from 'react';
import {
	Main,
	Box,
	ContactList,
	ContactDetails,
	ContactsSummary,
	AddEditModal,
	DeleteModal,
	Loading
} from '../components/index';
import UpdateImage from '../components/UpdateImage';

function Contacts({ query, signOut, countryId, setCountryId }) {
	// const [contactList, token]= useContext(UserContacts);
	// console.log(contactList , token);
	const [contactList, setContactList] = useState([]);
	const [listLength, setListLength] = useState(contactList.length);
	const listEmpty = listLength < 1 ? 'No Contacts Found' : 'Contacts Loaded';

	const [selectedContact, setSelectedContact] = useState(null);
	const [addEditModal, setAddEditModal] = useState(false);
	const [action, setAction] = useState('Add');
	const [listChange, setListChange] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [token, setToken] = useState(
		localStorage.getItem('contactAppUserToken')
	);
	const [showImgForm, setShowImgForm] = useState(false);
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
			console.log(error);
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
				setLoading(true);
				const response = await fetch(
					'http://localhost:8000/contacts',
					requestOptions
				);
                // console.log(response);

				if (!response.ok) {
					setLoading(false);
					setContactList([]);
					throw new Error('Error Loading List');
				}

				const data = await response.json();
				setTimeout(() => {
					setListLength(data.length);
					setLoading(false);
					setContactList(data);
				}, 1000);
				// console.log(data);
			} catch (error) {
				console.log(error);
			}
		};
		GetList();
	}, [token, listChange]);

	return (
		<>
			<Main>
				{showImgForm && (
					<UpdateImage
						setShowImgForm={setShowImgForm}
						setListChange={setListChange}
						setSelectedContact={setSelectedContact}
						selectedContact={selectedContact}
					/>
				)}
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
						setListChange={setListChange}
						selectedContact={selectedContact}
						countryId={countryId}
						setCountryId={setCountryId}
						contactList={contactList}
					/>
				)}
				<Box listEmpty={listEmpty}>
					{loading ? (
						<Loading isLoading={loading} />
					) : (
						<ContactList
							contactList={contactList}
							setSelectedContact={setSelectedContact}
							query={query}
							selectedContact={selectedContact}
						/>
					)}
				</Box>
				<Box>
					<ContactsSummary
						setAction={setAction}
						setAddEditModal={setAddEditModal}
						listLength={listLength}
						setCountryId={setCountryId}
					/>
					{selectedContact && (
						<ContactDetails
							selectedContact={selectedContact}
							setSelectedContact={setSelectedContact}
							deleteContact={handleDeleteContact}
							setDeleteModal={setDeleteModal}
							setAddEditModal={setAddEditModal}
							setAction={setAction}
							countryId={countryId}
							setCountryId={setCountryId}
							setShowImgForm={setShowImgForm}
						/>
					)}
				</Box>
			</Main>
		</>
	);
}

export default Contacts;
