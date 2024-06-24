const DeleteModal = ({
	setDeleteModal,
	handleDeleteContact,
	selectedContact
}) => {
	return (
		<div className="delete-modal">
			<div className="delete-content">
				<h3>Contact will be permanently removed!!</h3>
				<div className="btns">
					<button
						style={{
							background: 'green'
						}}
						onClick={() => setDeleteModal(false)}
					>
						return
					</button>
					<button
						style={{
							background: 'red'
						}}
						onClick={() => {
							handleDeleteContact(selectedContact.id);
						}}
					>
						continue
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteModal;
