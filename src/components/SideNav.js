import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { GrHome } from "react-icons/gr";
import { FaDog, FaRegUser, FaRegNewspaper } from "react-icons/fa6";
import { IoMenuOutline } from "react-icons/io5";
import { BiCalendar } from "react-icons/bi";
import Item from "./NavItem";

const SideNav = ({ authID }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Home");
  const dog = localStorage.dog ? JSON.parse(localStorage.dog) : false;

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
          title={authID || dog.id ? "My Profile" : "Create Profile"}
          to={authID || dog.id ? `/dogs/${authID || dog.id}` : "/add"}
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
        <Item
          title="Events"
          to="/events"
          icon={<BiCalendar />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="News"
          to="/news"
          icon={<FaRegNewspaper />}
          selected={selected}
          setSelected={setSelected}
        />
      </Menu>
    </Sidebar>
  );
};

export default SideNav;
