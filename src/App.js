import { useState } from "react";
import { Outlet } from "react-router-dom";
import TopNav from "./components/TopNav";
import SideNav from "./components/SideNav";

const App = () => {
  const [isDark, setIsDark] = useState(false);
  const [currentDog,setCurrentDog] = useState({})
  const toggleDarkMode = () => setIsDark(!isDark);

  const changeCurrentDog = (newDog) =>{
    if(newDog){
      setCurrentDog(newDog)
      localStorage.dog = JSON.stringify(newDog)
    }
  }
  return (
    <div className="app">
      <SideNav currentDog={currentDog}/>
      <main className="container">
        <TopNav isDark={isDark} toggleDarkMode={toggleDarkMode} />
        <Outlet context={changeCurrentDog}/>
      </main>
    </div>
  );
};

export default App;
