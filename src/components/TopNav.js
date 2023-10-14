import { BsSun, BsMoon } from "react-icons/bs";

import Search from "./Search";

const TopNav = ({ isDark, toggleDarkMode }) => {
  return (
    <nav className="top-nav">
      <div className="links">
        <Search />
        <span onClick={toggleDarkMode} className="icon">
          {isDark ? <BsSun /> : <BsMoon />}
        </span>
      </div>
    </nav>
  );
};

export default TopNav;
