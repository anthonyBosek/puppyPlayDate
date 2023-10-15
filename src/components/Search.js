import { GrSearch } from "react-icons/gr";

const Search = () => {
  return (
    <div className="search">
      <input type="text" placeholder="Search" />
      <button>
        <GrSearch />
      </button>
    </div>
  );
};

export default Search;
