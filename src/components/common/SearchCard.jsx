
const SearchCard = () => {
    return (
        <div className="search-card">
        <div className="search-fields">
            <input className="search-input" type="text" placeholder="Enter a location, postcode or address" />
            <select className="search-select" defaultValue="any">
            <option value="any">Any type</option>
            <option value="house">Houses</option>
            <option value="flat">Flats</option>
            <option value="new">New builds</option>
            </select>
            <button className="search-submit">Search</button>
        </div>
        </div>
    );
}

export default SearchCard
