import { Link } from "react-router-dom";
import { MenuItem } from "react-pro-sidebar";

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

export default Item;
