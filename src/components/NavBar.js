import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <div className="links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dogs">View Dogs</NavLink>
        <NavLink to="/dogs/:id">Profile</NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
