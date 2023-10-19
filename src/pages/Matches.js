import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { FaPaw } from "react-icons/fa";
import Card from "../components/Card";

const Matches = () => {
  const { setAlertMessage, handleSnackType } = useOutletContext();
  const navigate = useNavigate();
  const matches = JSON.parse(localStorage.matches || "[]");
  const userDog = JSON.parse(localStorage.dog || "{}");

  const allMatches = matches.map((match) => {
    return <Card key={match.id} dog={match} />;
  });

  useEffect(() => {
    if (!userDog.id) {
      handleSnackType("error");
      setAlertMessage("You Must Sign Up To Access This Page");
      navigate("/add");
    }
  }, [userDog.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return userDog.id ? (
    <div className="view-all">
      <h1>
        My matches
        <span className="paw-icon">
          <FaPaw />
          <FaPaw />
        </span>
      </h1>
      <div className="all-cards">{allMatches}</div>
    </div>
  ) : null;
};

export default Matches;
