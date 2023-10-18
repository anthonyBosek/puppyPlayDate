import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useLocation } from "react-router-dom";

const Search = ({ searchTerm, newSearch }) => {
  const [showingSearch, setShowingSearch] = useState(false);
  const location = useLocation();

  useEffect(() => {
    location.pathname === "/dogs"
      ? setShowingSearch(true)
      : setShowingSearch(false);
  }, [location.pathname]);

  return showingSearch ? (
    <div className="search">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={newSearch}
      />
      <button>
        <BsSearch />
      </button>
    </div>
  ) : null;
};

export default Search;
