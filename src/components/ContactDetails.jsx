import { useState } from 'react';

const ContactDetails = ({
	selectedContact,
	setSelectedContact,
	setDeleteModal,
	setAction,
	setAddEditModal,
	countryId,
	setCountryId,
	setShowImgForm
}) => {
	return (
		<>
			<div className="details">
				<header>
					<button className="btn-back" onClick={() => setSelectedContact(null)}>
						&larr;
					</button>
					<div className="details-overview">
						<img
							src={selectedContact?.imgURL}
							alt={` ${selectedContact?.firstname}`}
							onClick={() => setShowImgForm(true)}
						/>
						<h2>
							{selectedContact.firstname} {selectedContact.lastname}
							<button
								className="btn-delete"
								onClick={() => setDeleteModal(prev => !prev)}
							>
								X
							</button>
						</h2>
						<p>contact ID: {selectedContact?.id}</p>
						<p>state: {selectedContact?.state}</p>
						<p>Country: {selectedContact?.country}</p>
						<p>
							<span>📱</span>
							Mobile: {selectedContact?.mobile ? selectedContact.mobile : '- -'}
						</p>
						<p>Email: {selectedContact?.email}</p>
						<button
							className="btn-summary"
							onClick={() => {
								setAddEditModal(prev => !prev);
								setAction('Edit');
								setCountryId(selectedContact.countryId);
							}}
						>
							Edit
						</button>
					</div>
				</header>
			</div>
		</>
	);
};

export default ContactDetails;
