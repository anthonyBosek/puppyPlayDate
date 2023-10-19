import { Link } from "react-router-dom";
import { FaPaw } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div id="error">
      <h1>
        Ruh-roh!
        <span className="paw-icon">
          <FaPaw />
          <FaPaw />
        </span>
      </h1>
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
