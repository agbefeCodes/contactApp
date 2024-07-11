/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import email_icon from './Assets/email.png';
import mobile_icon from './Assets/mobile.png';
import user_icon from './Assets/person.png';

const AddEditModal = ({
	setListChange,
	selectedContact,
	setSelectedContact,
	setAddEditModal,
	token,
	action,
	countryId,
	setCountryId,
	contactList
}) => {
	const [statesReload, setStatesReload] = useState(false);
	const [countries, setCountries] = useState([]);
	const [states, setStates] = useState([]);
	const [oldContact, setOldContact] = useState(selectedContact);

	const [newContact, setNewContact] = useState({
		firstname: '',
		lastname: '',
		email: '',
		mobile: '',
		imgURL: '',
		countryId: 1,
		stateId: 1,
		ownerId: 1
	});

	useEffect(() => {
		const contact = contactList
			.filter(contact => contact?.id === selectedContact?.id)
			.at(0);
		const cleanUp = setTimeout(() => {
			setSelectedContact(contact);
		}, 1000);
		return () => clearTimeout(cleanUp);
	}, [contactList, selectedContact?.id, setSelectedContact]);

	useEffect(() => {
		const getCountries = async () => {
			const requestOptions = {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			};
			try {
				const res = await fetch(
					'http://localhost:8000/countries',
					requestOptions
				);
				const data = await res.json();
				setCountries(data);
				setStatesReload(prev => !prev);
			} catch (error) {
				console.error(error);
			}
		};
		getCountries();
	}, [token]);

	useEffect(() => {
		const getStatesForSelectedCountry = async () => {
			const requestOptions = {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			};
			try {
				const res = await fetch(
					`http://localhost:8000/states/all/${countryId}`,
					requestOptions
				);
				const data = await res.json();
				setStates(data);
			} catch (error) {
				console.error(error);
			}
		};
		const cleanUp = setTimeout(() => {
			getStatesForSelectedCountry();
		}, 500);
		return () => clearTimeout(cleanUp);
	}, [countryId, statesReload]);

	const required = {
		a: newContact.firstname,
		b: newContact.lastname,
		c: newContact.email
	};

	// CREATE / EDIT CONTACT***************************************************************
	// console.log(oldContact);
	const create_edit_contact = async e => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		formData.append('imgURL', selectedContact?.imgURL);

		action === 'Add'
			? (formData.set('firstname', newContact.firstname),
				formData.set('lastname', newContact.lastname))
			: (formData.set('firstname', oldContact.firstname),
				formData.set('lastname', oldContact.lastname));

		console.log([...formData.entries()]);

		// const newDetails = {
		// 	firstname: oldContact.firstname,
		// 	lastname: oldContact.firstname,
		// 	mobile: oldContact.firstname,
		// 	email: oldContact.email,
		// 	imgURL: oldContact.imgURL,
		// 	stateId: oldContact.stateId,
		// 	countryId: oldContact.countryId
		// };

		const requestOptions = {
			method: `${action === 'Add' ? 'POST' : 'PUT'}`,
			headers: {
				// 'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: formData
		};
		try {
			const response = await fetch(
				`http://localhost:8000/${
					action === 'Add' ? 'contacts' : `contacts/${oldContact.id}`
				}`,
				requestOptions
			);
			if (!response.ok) {
				if (action === 'Add') {
					throw new Error('Contact may already exist');
				} else {
					throw new Error('Something went wrong');
				}
			}
			const data = await response.json();
			setListChange(prev => !prev);
			setAddEditModal(false);
		} catch (error) {
			alert(error);
		} finally {
			setAddEditModal(false);
		}
	};

	const capitalize = str => {
		if (str === '') return null;
		return str.at(0).toUpperCase() + str.slice(1).toLowerCase();
	};

	return createPortal(
		<div className="add-edit-contact-container">
			<form
				className="contact-data"
				name="contactData"
				onSubmit={create_edit_contact}
			>
				<div className="form-content">
					<div className="close-btn-container">
						<div
							className="close-btn"
							onClick={() => setAddEditModal(prev => !prev)}
						>
							X
						</div>
					</div>
					<div className="header">
						{action === 'Add' ? 'Add Contact' : 'Edit Contact'}
					</div>
					<div className="input-divs">
						<img src={user_icon} alt="" />
						<input
							type="text"
							name="firstname"
							value={
								action === 'Add' ? newContact.firstname : oldContact.firstname
							}
							placeholder={
								action === 'Add' ? 'Firstname' : oldContact.firstname
							}
							onChange={e => {
								if (action === 'Add') {
									setNewContact(prev => ({
										...prev,
										firstname: capitalize(e.target.value)
									}));
									return;
								}
								setOldContact(prev => ({
									...prev,
									firstname: capitalize(e.target.value)
								}));
							}}
						/>
					</div>
					<div className="input-divs">
						<img src={user_icon} alt="" />
						<input
							type="text"
							name="lastname"
							value={
								action === 'Add' ? newContact.lastname : oldContact.lastname
							}
							placeholder={action === 'Add' ? 'Lastname' : oldContact.lastname}
							onChange={e => {
								if (action === 'Add') {
									setNewContact(prev => ({
										...prev,
										lastname: capitalize(e.target.value)
									}));
									return;
								}
								setOldContact(prev => ({
									...prev,
									lastname: capitalize(e.target.value)
								}));
							}}
						/>
					</div>
					<div className="input-divs">
						<img src={email_icon} alt="" />
						<input
							type="email"
							name="email"
							value={action === 'Add' ? newContact.email : oldContact.email}
							placeholder={action === 'Add' ? 'Email' : oldContact.email}
							onChange={e => {
								if (action === 'Add') {
									setNewContact(prev => ({
										...prev,
										email: e.target.value
									}));
									return;
								}
								setOldContact(prev => ({
									...prev,
									email: e.target.value
								}));
							}}
						/>
					</div>
					<div className="input-divs">
						<img src={mobile_icon} alt="" />
						<input
							type="text"
							name="mobile"
							value={action === 'Add' ? newContact.mobile : oldContact.mobile}
							placeholder={action === 'Add' ? 'Mobile' : oldContact.mobile}
							onChange={e => {
								if (action === 'Add') {
									setNewContact(prev => ({
										...prev,
										mobile: e.target.value
									}));
									return;
								}
								setOldContact(prev => ({
									...prev,
									mobile: e.target.value
								}));
							}}
						/>
					</div>

					<div className="input-divs">
						<label htmlFor="img">Image:</label>
						<input
							style={{ marginTop: '1rem', color: 'dodgerblue', height: '50px' }}
							type="file"
							name="file"
							accept="image/*"
							onChange={e => {
								if (action === 'Add') {
									setNewContact(prev => ({
										...prev,
										imgURL: e.target.files[0]
									}));
									return;
								}
								setOldContact(prev => ({
									...prev,
									imgURL: e.target.files[0]
								}));
							}}
						/>
					</div>
					<div className="input-divs">
						<label htmlFor="countryId">Country:</label>
						<select
							name="countryId"
							id="countryId"
							onChange={e => {
								setCountryId(+e.target.value);
								if (action === 'Add') {
									setNewContact(prev => ({
										...prev,
										countryId: +e.target.value
									}));
									return;
								}
								setOldContact(prev => ({
									...prev,
									countryId: +e.target.value
								}));
							}}
						>
							{countries.map(country => (
								<option
									key={country.id}
									value={country.id}
									selected={
										action === 'Add'
											? country.id === newContact.countryId
											: country.id === oldContact.countryId
									}
								>
									{country.name}
								</option>
							))}
						</select>
					</div>

					<div className="input-divs">
						<label htmlFor="stateId">State:</label>
						<select
							name="stateId"
							id="stateId"
							onChange={e => {
								if (action === 'Add') {
									setNewContact(prev => ({
										...prev,
										stateId: +e.target.value
									}));
									return;
								}
								setOldContact(prev => ({
									...prev,
									stateId: +e.target.value
								}));
							}}
						>
							{states.map(state => (
								<option key={state.id} value={state.id}>
									{state.name}
								</option>
							))}
						</select>
					</div>

					<div className="btns">
						<button
							className="btn-items"
							type="button"
							onClick={() => setAddEditModal(prev => !prev)}
						>
							cancel
						</button>
						<button
							className="btn-items"
							type="submit"
							onClick={e => create_edit_contact()}
						>
							{action === 'Add' ? 'add' : 'edit'}
						</button>
					</div>
				</div>
			</form>
		</div>,
		document.getElementById('modal')
	);
};

export default AddEditModal;
