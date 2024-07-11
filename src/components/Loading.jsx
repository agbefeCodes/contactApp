import { useState } from 'react';
import { FadeLoader } from 'react-spinners';
const override = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'red'
};
const Loading = ({ isLoading }) => {
	const [loading, setLoading] = useState(isLoading);
	return (
		<div className="loader">
			<FadeLoader
				color="#ec8804"
				loading={loading}
				height={15}
				width={5}
				speedMultiplier={1.5}
				radius={2}
				cssOverride={override}
			/>
			<p>loading...</p>
		</div>
	);
};

export default Loading;
