import React from 'react';

const UpdateImage = ({
	setShowImgForm,
	setListChange,
	setSelectedContact,
	selectedContact
}) => {
	const updateImage = async e => {
		e.preventDefault();
		const token = localStorage.getItem('contactAppUserToken');
		const formData = new FormData(e.currentTarget);
		const requestOptions = {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${token}`
			},
			body: formData
		};
		try {
			const res = await fetch(
				`http://localhost:8000/contacts/update_img/${selectedContact.id}`,
				requestOptions
			);
			if (!res.ok) {
				throw new Error('Image upload unsuccessful');
			}
			const resData = await res.json();
			setShowImgForm(false);
			setListChange(prev => !prev);
		} catch (error) {
			alert(error);
		}
	};
	return (
		<div className="img-update-overlay">
			<div className="img-update-container">
				<span onClick={() => setShowImgForm(false)}>X</span>
				<p>Update image</p>
				<form className="img-update-form" onSubmit={updateImage}>
					<div>
						<label htmlFor="img">select image:</label>
						<input type="file" id="img" name="file"></input>
					</div>
					<button type="submit" className="img-update-btn">
						update
					</button>
				</form>
			</div>
		</div>
	);
};

export default UpdateImage;
