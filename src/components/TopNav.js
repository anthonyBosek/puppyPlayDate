import { BsSun, BsMoon } from "react-icons/bs";

import Search from "./Search";

const TopNav = () => {
  return (
    <nav>
      <div className="links">
        <BsSun />
        <BsMoon />
        <Search />
      </div>
    </nav>
  );
};

export default TopNav;
