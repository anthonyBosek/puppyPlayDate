import { useState } from "react";
import { Outlet } from "react-router-dom";
import TopNav from "./components/TopNav";
import SideNav from "./components/SideNav";

const App = () => {
  const [isDark, setIsDark] = useState(localStorage.dark === "true");
  const [searchTerm, setSearchTerm] = useState("");
  const [authID, setAuthID] = useState(null);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    localStorage.setItem("dark", !isDark);
  };

  const newSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const authUserID = (id) => setAuthID(id);

  const ctx = { authUserID, searchTerm };

  return (
    <div className={isDark ? "app dark" : "app"}>
      <SideNav authID={authID} />
      <main className="container">
        <TopNav
          isDark={isDark}
          toggleDarkMode={toggleDarkMode}
          newSearch={newSearch}
          searchTerm={searchTerm}
        />
        <div className="outlet">
          <Outlet context={ctx} />
        </div>
      </main>
    </div>
  );
};

export default App;
