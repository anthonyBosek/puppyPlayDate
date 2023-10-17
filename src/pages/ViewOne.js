import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { GiMale, GiFemale } from "react-icons/gi";
import { FaBone, FaTimes } from "react-icons/fa";

const ViewOne = () => {
  const userDog = localStorage.dog ? JSON.parse(localStorage.dog) : false;
  const { id } = useParams() || userDog.id;
  const navigate = useNavigate();
  const [dog, setDog] = useState({});

  if (!localStorage.matches) {
    localStorage.setItem("matches", "[]");
  }

  if (!localStorage.unmatches) {
    localStorage.setItem("unmatches", "[]");
  }

  const matches = localStorage.matches;
  const unmatches = localStorage.unmatches;

  const addMatch = (newMatchDog) => {
    if (userDog.id) {
      const allDogs = JSON.parse(matches);
      const ids = allDogs.map((doggy) => doggy.id);
      if (!ids.includes(newMatchDog.id) && userDog.id !== newMatchDog.id) {
        allDogs.push(newMatchDog);
        localStorage.setItem("matches", JSON.stringify(allDogs));
      } else {
        console.log("Already matched");
      }
    } else {
      alert("Please Sign up to match with dogs");
    }
  };

  const removeMatch = (newMatchDog) => {
    if (userDog.id) {
      const allDogs = JSON.parse(matches);
      const allBlockedDogs = JSON.parse(unmatches);
      const ids = allDogs.map((doggy) => doggy.id);
      const blockedids = allBlockedDogs.map((doggy) => doggy.id);
      if (!ids.includes(newMatchDog.id)) {
        if (!blockedids.includes(newMatchDog.id)) {
          allBlockedDogs.push(newMatchDog);
          localStorage.setItem("unmatches", JSON.stringify(allBlockedDogs));
        }
      } else {
        const newDogs = allDogs.filter((doggy) => doggy.id !== newMatchDog.id);
        localStorage.setItem("matches", JSON.stringify(newDogs));
      }
    } else {
      alert("Please sign up first");
    }
  };

  useEffect(() => {
    const getDogData = () => {
      fetch(`http://localhost:3005/dogs/${id || userDog.id}`)
        .then((resp) => (resp.status === 200 || 304 ? resp.json() : false))
        .then(setDog)
        .catch(alert);
    };
    getDogData();
  }, [id, userDog.id]);

  return dog.id ? (
    <div className="dogPage">
      <div>
        <img src={dog.image} alt={dog.name} />
      </div>
      <div>
        <h1>
          {dog.name}, <span>{dog.age}</span>
        </h1>
        <p>
          {dog.gender === "male" ? <GiMale /> : <GiFemale />} {dog.breed}
        </p>
        <p className="bold">About me:</p>
        <p>{dog.bio}</p>
        <p className="bold">Get in touch with my people:</p>
        <p>{dog.owner}</p>
        {userDog.id === dog.id ? (
          <>
            <button
              className="btn-small bg-yellow larger-text"
              onClick={() => {
                localStorage.removeItem("dog");
                navigate("/add");
              }}
            >
              Delete
            </button>
            <Link to={`/edit/${id}`}>
              <button className="btn-small bg-blue larger-text">Edit</button>
            </Link>
          </>
        ) : (
          <>
            <Link>
              <button
                className="btn-small bg-yellow larger-text"
                onClick={() => removeMatch(dog)}
              >
                <FaTimes />
              </button>
            </Link>
            <Link>
              <button
                className="btn-small bg-blue larger-text"
                onClick={() => addMatch(dog)}
              >
                <FaBone />
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  ) : (
    navigate("/")
  );
};

export default ViewOne;
