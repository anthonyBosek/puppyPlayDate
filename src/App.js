import { useState } from "react";
import { Outlet } from "react-router-dom";
import TopNav from "./components/TopNav";
import SideNav from "./components/SideNav";

const App = () => {
  const [isDark, setIsDark] = useState(false);
  const [authID, setAuthID] = useState(null);

  const toggleDarkMode = () => setIsDark(!isDark);


  const changeCurrentDog = (newDog) =>{
    if(newDog){
      setCurrentDog(newDog)
      localStorage.dog = JSON.stringify(newDog)
    }
  }

  const authUserID = (id) => setAuthID(id);


  return (
    <div className="app">
      <SideNav authID={authID} />
      <main className="container">
        <TopNav isDark={isDark} toggleDarkMode={toggleDarkMode} />
        <Outlet context={authUserID} />
      </main>
    </div>
  );
};

export default App;
