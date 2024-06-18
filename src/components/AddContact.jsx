import LabelAndInput from './LabelAndInput';

function AddContact() {
	return (
		<div className="add-contact-container">
			<h3>Add Contact</h3>
			<form action="">
				<div className="add-contact-inputs">
					<div>
						<LabelAndInput label="First Name" />
						<LabelAndInput label="Last Name" />
					</div>
					<div>
						<LabelAndInput label="Email" type="email" />
						<LabelAndInput label="Mobile" />
					</div>
					<div>
						<label htmlFor="country">Country</label>
						<select name="country" id="country">
							<option value="1">Nigeria</option>
							<option value="1">Ghana</option>
							<option value="1">Togo</option>
						</select>
						<label htmlFor="state">State</label>
						<select name="state" id="state">
							<option value="1">Delta</option>
							<option value="2">Accra</option>
							<option value="3">Togo-state</option>
						</select>
					</div>

				</div>
					<LabelAndInput label={'img'} type={'file'} />
				<button className='btn' type="submit">Add Contact</button>
			</form>
		</div>
	);
}

export default AddContact;
