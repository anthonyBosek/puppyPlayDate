import { BsSearch } from "react-icons/bs";

const Search = ({searchTerm, newSearch}) => {
  return (
    <div className="search">
      <input type="text" placeholder="Search" value={searchTerm} onChange={newSearch}/>
      <button>
        <BsSearch />
      </button>
    </div>
  );
};

export default Search;
