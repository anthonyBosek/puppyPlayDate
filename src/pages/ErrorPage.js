import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div id="error">
      <h1>Ruh-roh!</h1>
      <h3>404 Something's not right!</h3>
      <Link to="/">
        <button className="btn-large bg-yellow larger-text">
          Take me back!
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
