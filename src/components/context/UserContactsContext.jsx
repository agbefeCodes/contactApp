import { useState, useEffect, createContext } from 'react';
import App from '../../App';

export const UserContacts = createContext();
export const GetContactsList = () => {
	const [token, setToken] = useState(
	// 	localStorage.getItem('contactAppUserToken')
	);
	const [contactList, setContactList] = useState([]);
	// useEffect(() => {
	// 	const GetList = async () => {
	// 		const requestOptions = {
	// 			method: 'GET',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				Authorization: `Bearer ${token}`
	// 			}
	// 		};
	// 		try {
	// 			const response = await fetch(
	// 				'http://localhost:8000/contacts',
	// 				requestOptions
	// 			);
	// 			if (!response.ok) {
	// 				console.log(response);
	// 				throw new Error('Error Loading List');
	// 			}

	// 			const data = await response.json();
	// 			setContactList(data);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	};
	// 	GetList();
	// }, [token]);

	return (
		<UserContacts.Provider value={[contactList, token]}>
			<App />
			{/* <Contacts /> */}
		</UserContacts.Provider>
	);
};
