import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <div id="home">
      <h1>Dog-Gone Dates</h1>
      <h3>Find your dog a date!</h3>
      <Link to="/add">
        <button className="btn-large bg-yellow larger-text">
          Let's get started!
        </button>
      </Link>
    </div>
  );
};

export default HomePage;
