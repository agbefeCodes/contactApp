function LabelAndInput({ label, type }) {
	return (
		<div className="label-input-group">
			<label htmlFor={label}>{label}</label>
			<input type={type ? type : 'text'} id={label} name={label} />
		</div>
	);
}

export default LabelAndInput;
