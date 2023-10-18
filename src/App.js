import { useState, useEffect } from "react";
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
  const [dogs, setDogs] = useState([]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    localStorage.setItem("dark", !isDark);
  };

  useEffect(() => {
    fetch("http://localhost:3005/dogs")
      .then((resp) => resp.json())
      .then(setDogs)
      .catch((err) => {
        handleSnackType("error");
        setAlertMessage(err.message);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddDog = (newDog) => {
    const updatedDogs = [...dogs, newDog]
    setDogs(updatedDogs)
  }

  const handleDeleteDog = (oldDog) => {
    const updatedDogs = dogs.filter(dog => dog.id !== oldDog.id)
    setDogs(updatedDogs)
    setAuthID(null)
  }

  const newSearch = (e) => setSearchTerm(e.target.value);

  const authUserID = (id) => setAuthID(id);

  const setAlertMessage = (msg) => setMessage(msg);

  const handleSnackType = (type) => setSnackType(type);

  const ctx = { dogs, searchTerm, authUserID, setAlertMessage, handleSnackType, handleAddDog, handleDeleteDog };

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
