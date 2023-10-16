import { useEffect, useState } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import { GiMale, GiFemale } from "react-icons/gi";
import { FaBone, FaTimes } from "react-icons/fa";

const ViewOne = () => {
  const { id } = useParams();
  const [dog, setDog] = useState({});
  const userDog = localStorage.dog ? JSON.parse(localStorage.dog) : false
  const navigate = useNavigate();

  useEffect(() => {
    const getDogData = () => {
      fetch(`http://localhost:3005/dogs/${id}`)
        .then((resp) =>
          resp.status === 200 || 304 ? resp.json() : false
        )
        .then(setDog)
        .catch(alert);
    };
    getDogData();
  }, [id]);

  return (
    dog.id ?
    <div className="dogPage">
      <div>
        <img src={dog.image} alt={dog.name} />
      </div>
      <div>
        <h1>{dog.name}, <span>{dog.age}</span></h1>
        <p>{dog.gender === "male" ? <GiMale /> : <GiFemale />}{dog.breed}</p>
        <p>
          About: <br /> {dog.bio}
        </p>
        <p>Owner: {dog.owner}</p>
        {userDog.id === dog.id? 
        <>
        <Link to={`/edit/${id}`}>
          <button className="btn-small bg-yellow larger-text"><FaTimes /></button>
        </Link>
        <button>Delete</button> </>: null}
      </div>
    </div> : navigate("/")
  );
};

export default ViewOne;
