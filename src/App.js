import { useState } from "react";
import { Outlet } from "react-router-dom";
import TopNav from "./components/TopNav";
import SideNav from "./components/SideNav";
import AlertBar from "./components/AlertBar";

const App = () => {
  const [isDark, setIsDark] = useState(localStorage.dark === "true");
  const [searchTerm, setSearchTerm] = useState("");
  const [authID, setAuthID] = useState(null);
  const [message, setMessage] = useState(null);
  const [snackType, setSnackType] = useState("");

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    localStorage.setItem("dark", !isDark);
  };

  const newSearch = (e) => setSearchTerm(e.target.value);

  const authUserID = (id) => setAuthID(id);

  const setAlertMessage = (msg) => setMessage(msg);

  const handleSnackType = (type) => setSnackType(type);

  const ctx = { searchTerm, authUserID, setAlertMessage, handleSnackType };

  return (
    <div className={isDark ? "app dark" : "app"}>
      <SideNav authID={authID} />
      <main className="container">
        {message && (
          <AlertBar
            message={message}
            snackType={snackType}
            setAlertMessage={setAlertMessage}
            handleSnackType={handleSnackType}
          />
        )}
        <TopNav
          isDark={isDark}
          searchTerm={searchTerm}
          toggleDarkMode={toggleDarkMode}
          newSearch={newSearch}
        />
        <div className="outlet">
          <Outlet context={ctx} />
        </div>
      </main>
    </div>
  );
};

export default App;
