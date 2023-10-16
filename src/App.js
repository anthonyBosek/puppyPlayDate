import { useState } from "react";
import { Outlet } from "react-router-dom";
import TopNav from "./components/TopNav";
import SideNav from "./components/SideNav";

const App = () => {
  const [isDark, setIsDark] = useState(localStorage.dark);
  const [authID, setAuthID] = useState(null);
  const toggleDarkMode = () => {
    setIsDark(!isDark)
    localStorage.dark = !localStorage.dark
  }

  const authUserID = (id) => setAuthID(id);

  return (
    <div className={isDark ? "app dark" : "app"}>
      <SideNav authID={authID} />
      <main className="container">
        <TopNav isDark={isDark} toggleDarkMode={toggleDarkMode} />
        <div className="outlet">
          <Outlet context={authUserID} />
        </div>
      </main>
    </div>
  );
};

export default App;
