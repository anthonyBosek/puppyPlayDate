import { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import { GiMale, GiFemale } from "react-icons/gi";

const Profile = () => {
  const { id } = useParams();
  const [dog, setDog] = useState({});

  useEffect(() => {
    const getDogData = () => {
      fetch(`http://localhost:3005/dogs/${id}`)
        .then((resp) =>
          resp.status === 200 || 201 || 304 ? resp.json() : false
        )
        .then(setDog)
        .catch(alert);
    };
    getDogData();
  }, [id]);
  return (
    <div>
      <h1>PROFILE</h1>
      <p>matches</p>
      <p>dogs in your area</p>
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
        <Link to={`/edit/${id}`}>
          <button>Edit</button>
        </Link>
        <button>Delete</button>
      </div>
    </div>
    </div>
  );
};

export default Profile;
