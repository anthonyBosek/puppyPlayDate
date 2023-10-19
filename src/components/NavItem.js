import { Link } from "react-router-dom";
import { MenuItem } from "react-pro-sidebar";

const Item = ({ title, to, icon, selected, setSelected, logOut }) => (
  <MenuItem
    icon={icon}
    active={selected === title}
    onClick={() =>
      logOut ? localStorage.setItem("dog", "[]") : setSelected(title)
    }
    component={<Link to={to} />}
  >
    {title}
  </MenuItem>
);

export default Item;
