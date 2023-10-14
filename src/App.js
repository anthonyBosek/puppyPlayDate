import { Outlet } from "react-router-dom";
import TopNav from "./components/TopNav";
import SideNav from "./components/SideNav";

const App = () => {
  return (
    <div className="app">
      <SideNav />
      <main className="container">
        <TopNav />
        <Outlet />
      </main>
    </div>
  );
};

export default App;
