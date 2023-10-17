import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { GrHome } from "react-icons/gr";
import { FaDog, FaRegUser, FaRegNewspaper } from "react-icons/fa6";
import { IoMenuOutline } from "react-icons/io5";
import { BiCalendar } from "react-icons/bi";
import Item from "./NavItem";
import { useLocation } from "react-router-dom";

const SideNav = ({ authID }) => {
  const dog = localStorage.dog ? JSON.parse(localStorage.dog) : false;
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth > 768 ? false : true);
  const location = useLocation().pathname
  const paths = [
    {title: "Home", path: "/"},
    {title: "Our Play Pack", path: "/dogs"},
    {title: authID || dog.id ? "My Play Profile" : "Create Play Profile", path: "/add"},
    {title: "Play Events", path: "/events"},
    {title: "Play News", path: "/news"}
  ]
  const [selected, setSelected] = useState(paths.find(a => a.path === location).title);
  
  return (
    <Sidebar collapsed={isCollapsed}>
      <Menu>
        <MenuItem
          onClick={() => setIsCollapsed(!isCollapsed)}
          icon={isCollapsed ? <IoMenuOutline /> : undefined}
        >
          {!isCollapsed && (
            <div>
              <span className="title">Puppy PlayDate</span>
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
          title={authID || dog.id ? "My Play Profile" : "Create Play Profile"}
          to={authID || dog.id ? `/dogs/${authID || dog.id}` : "/add"}
          icon={<FaRegUser />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Our Play Pack"
          to="/dogs"
          icon={<FaDog />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Play Events"
          to="/events"
          icon={<BiCalendar />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Play News"
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
