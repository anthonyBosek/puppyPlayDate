import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { NavLink } from "react-router-dom";
import { GrHome } from "react-icons/gr";

const Item = ({ title, to, icon, selected, setSelected }) => (
  <MenuItem
    active={selected === title}
    onClick={() => setSelected(title)}
    icon={icon}
  >
    <p>{title}</p>
    <NavLink to={to} />
  </MenuItem>
);

const SideNav = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Home");

  return (
    <Sidebar>
      <Menu className={isCollapsed ? "collapsed" : ""}>
        <Item
          title="Home"
          to="/"
          icon={<GrHome />}
          selected={selected}
          setSelected={setSelected}
        />
        {/* <MenuItem component={<NavLink to="/" />}>Home</MenuItem>
        <MenuItem component={<NavLink to="/dogs" />}>View Dogs</MenuItem>
        <MenuItem component={<NavLink to="/dogs/:id" />}>Profile</MenuItem> */}
      </Menu>
    </Sidebar>
  );
};

export default SideNav;
