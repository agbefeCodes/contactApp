const Search = ({ setQuery, query, searchContacts }) => {
	return (
		<div className="search-box">
			<label htmlFor="search">search:</label>
			<input
				className="search"
				type="text"
				placeholder="Search Contact"
                id="search"
				value={query}
				// onChange={e => searchContacts(e.target.value.toLowerCase())}
				onChange={e => setQuery(e.target.value.toLowerCase())}
			/>
		</div>
	);
};

export default Search;
