import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { GrHome } from "react-icons/gr";
import { FaDog, FaRegUser } from "react-icons/fa6";
import { IoMenuOutline } from "react-icons/io5";
import Item from "./NavItem";

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
          to="/profile/2"
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