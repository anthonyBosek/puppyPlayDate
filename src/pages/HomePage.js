import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <div>
      <h1>Dog-Gone Dates</h1>
      <p>Find your dog a date!</p>
      <Link to="/add">
        <button>Let's get started!</button>
      </Link>
    </div>
  );
};

export default HomePage;
