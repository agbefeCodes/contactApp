/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import email_icon from './Assets/email.png';
import mobile_icon from './Assets/mobile.png';
import user_icon from './Assets/person.png';
// import './AddEdit.css';

const AddEditModal = ({
	setListChange,
	selectedContact,
	setListIsEmpty,
	setSelectedContact,
	setAddEditModal,
	listChange,
	token,
	action
}) => {
	const [countries, setCountries] = useState([]);
	const [countryId, setCountryId] = useState(1);
	const [states, setStates] = useState([]);
	const [countriesReload, setCountriesReload] = useState(false);
	const [statesReload, setStatesReload] = useState(false);

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
				setCountryId(data[0].id);
				setStatesReload(true);
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
				// console.log(res);
				const data = await res.json();
				// console.log(data);
				setStates(data);
			} catch (error) {
				console.error(error);
			}
		};
		setTimeout(() => {
			getStatesForSelectedCountry();
		}, 500);
	}, [countryId, statesReload]);

	const required = {
		a: newContact.firstname,
		b: newContact.lastname,
		c: newContact.email
	};

	const requestBody = action === 'Add' ? newContact : oldContact;
	// CREATE / EDIT CONTACT***************************************************************
	const create_edit_contact = async e => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		const requestOptions = {
			method: `${action === 'Add' ? 'POST' : 'PUT'}`,
			headers: {
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(newContact)
		};
		try {
			const response = await fetch(
				`http://localhost:8000/${
					action === 'Add' ? 'contacts' : `contacts/${selectedContact.id}`
				}`,
				requestOptions
			);
			console.log(response);
			const data = await response.json();
			console.log(data);
			setSelectedContact(null);
			setListIsEmpty(false);
			setListChange(!listChange);
		} catch (error) {
			console.log(error);
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
							placeholder="Firstname"
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
									firstname: e.target.value
								}));
							}}
						/>
					</div>
					<div className="input-divs">
						<img src={user_icon} alt="" />
						<input
							type="text"
							name="lastname"
							placeholder="Lastname"
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
									lastname: e.target.value
								}));
							}}
						/>
					</div>
					<div className="input-divs">
						<img src={email_icon} alt="" />
						<input
							type="email"
							name="email"
							placeholder="Email"
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
							placeholder="Mobile"
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
							style={{ marginTop: '1rem', color: 'red', height: '50px' }}
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
								<option key={country.id} value={country.id}>
									{country.name}
								</option>
							))}
						</select>
					</div>

					<div className="input-divs">
						<label htmlFor="img">State:</label>
						<select
							name="stateId"
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
						<button className="btn-items" type="submit">
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
