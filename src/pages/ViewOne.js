import { useEffect, useState } from "react";
import {
  Link,
  useParams,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { GiMale, GiFemale } from "react-icons/gi";
import { FaBone, FaTimes } from "react-icons/fa";

const ViewOne = () => {
  const { setAlertMessage, handleSnackType, handleDeleteDog } = useOutletContext();
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
        handleSnackType("success");
        setAlertMessage("It's a match!");
      } else {
        handleSnackType("warning");
        setAlertMessage("Already matched");
      }
    } else {
      handleSnackType("warning");
      setAlertMessage("Please Sign up to interact with dogs");
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
          handleSnackType("success");
          setAlertMessage("We'll let them down easy");
        }
      } else {
        const newDogs = allDogs.filter((doggy) => doggy.id !== newMatchDog.id);
        localStorage.setItem("matches", JSON.stringify(newDogs));
        handleSnackType("success");
        setAlertMessage("We'll let them down easy");
      }
    } else {
      handleSnackType("warning");
      setAlertMessage("Please Sign up to interact with dogs");
    }
  };

  useEffect(() => {
    const getDogData = () => {
      fetch(`http://localhost:3005/dogs/${id || userDog.id}`)
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          } else {
            navigate("/");
          }
        })

        .then(setDog)
        .catch((err) => {
          handleSnackType("error");
          setAlertMessage(err.message);
        });
    };
    getDogData();
  }, [id, userDog.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const deleteProfile = (dog) => {
    fetch(`http://localhost:3005/dogs/${id || dog.id}`, {
      method: "DELETE"
    })
    .then(() => {
      localStorage.removeItem("dog");
      localStorage.removeItem("matches");
      localStorage.removeItem("unmatches");
      handleSnackType("warning");
      setAlertMessage("Profile deleted");
      navigate("/add");
      handleDeleteDog(dog);
      // authUserID(null)
    })
    .catch(err => {
      handleSnackType("error");
      setAlertMessage(err.message);
    })
  }

  return (
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
              onClick={() => deleteProfile(dog)}
            >
              Delete
            </button>
            <Link to={`/profile/edit/`}>
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
  );
};

export default ViewOne;
