import { useState } from 'react';
import Button from './Button';

function Box({ children, listEmpty }) {
	const [isOpen, setIsOpen] = useState(true);
	return (
		<div className="box">
			<div className="top-gradient">{listEmpty}</div>
			<Button isOpen={isOpen} setIsOpen={setIsOpen} />
			{isOpen && children}
		</div>
	);
}

export default Box;
