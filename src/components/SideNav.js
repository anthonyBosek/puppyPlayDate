import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { GrHome } from "react-icons/gr";
import { FaDog, FaHome, FaRegUser } from "react-icons/fa6";
import { IoMenuOutline } from "react-icons/io5";

const Item = ({ title, to, icon, selected, setSelected }) => (
  <MenuItem
    icon={icon}
    active={selected === title}
    onClick={() => setSelected(title)}
    component={<Link to={to} />}
  >
    {title}
  </MenuItem>
);

const SideNav = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Home");

  return (
    <Sidebar collapsed={isCollapsed}>
      <Menu>
        <MenuItem
          onClick={() => setIsCollapsed(!isCollapsed)}
          icon={isCollapsed ? <IoMenuOutline /> : undefined}
        >
          {!isCollapsed && (
            <div>
              <span className="title">Puppy Play Date</span>
              <span>
                <IoMenuOutline onClick={() => setIsCollapsed(!isCollapsed)} />
              </span>
            </div>
          )}
        </MenuItem>
        <Item
          title="Home"
          to="/"
          icon={<GrHome />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="My Profile"
          to="/profile"
          icon={<FaRegUser />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="View All Dogs"
          to="/dogs"
          icon={<FaDog />}
          selected={selected}
          setSelected={setSelected}
        />
      </Menu>
    </Sidebar>
  );
};

export default SideNav;
