import { BsSearch } from "react-icons/bs";

const Search = () => {
  return (
    <div className="search">
      <input type="text" placeholder="Search" />
      <button>
        <BsSearch />
      </button>
    </div>
  );
};

export default Search;
