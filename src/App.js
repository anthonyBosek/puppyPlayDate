import { useState } from "react";
import { Outlet } from "react-router-dom";
import TopNav from "./components/TopNav";
import SideNav from "./components/SideNav";

const App = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => setIsDark(!isDark);

  return (
    <div className="app">
      <SideNav />
      <main className="container">
        <TopNav isDark={isDark} toggleDarkMode={toggleDarkMode} />
        <Outlet />
      </main>
    </div>
  );
};

export default App;
