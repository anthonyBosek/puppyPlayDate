import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <Outlet />
    </>
  );
};

export default App;
