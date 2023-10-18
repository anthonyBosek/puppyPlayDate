import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div id="home">
      <h1>Puppy PlayDate</h1>
      <h3 id="home-h3">
        Embark on delightful playdates with fellow dog lovers in your area!
      </h3>
      <Link to={JSON.parse(localStorage.dog || "[]").id ? "/profile" : "/add"}>
        <button className="btn-large bg-yellow larger-text">
          Let's get started!
        </button>
      </Link>
    </div>
  );
};

export default HomePage;
