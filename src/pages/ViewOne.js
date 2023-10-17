import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { GiMale, GiFemale } from "react-icons/gi";
import { FaBone, FaTimes } from "react-icons/fa";

const ViewOne = () => {
  const userDog = localStorage.dog ? JSON.parse(localStorage.dog) : false;
  const { id } = useParams() || userDog.id;
  const navigate = useNavigate();
  const [dog, setDog] = useState({});

  if(!localStorage.matches){
    localStorage.setItem("matches","[]")
  }
  const matches = localStorage.matches

  const addMatch = (newMatchDog) =>{
    const allDogs = JSON.parse(matches)
    const ids = allDogs.map(doggy => doggy.id)
    if(!(ids).includes(newMatchDog.id) && (userDog.id !== newMatchDog.id)){
      allDogs.push(newMatchDog)
      localStorage.setItem("matches",JSON.stringify(allDogs))
    }else{
      console.log("Already matched")
    }
  }

  const removeMatch = (newMatchDog) =>{
    const allDogs = JSON.parse(matches)
    const ids = allDogs.map(doggy => doggy.id)
    if(!(ids.includes(newMatchDog.id))){
      console.log("Dog isnt matched with")
    }else{
      const newDogs = allDogs.filter(doggy => doggy.id !== newMatchDog.id)
      localStorage.setItem("matches",JSON.stringify(newDogs))
    }
  }
  // addMatch({name:"hello"})
  

  useEffect(() => {
    const getDogData = () => {
      fetch(`http://localhost:3005/dogs/${id || userDog.id}`)
        .then((resp) => (resp.status === 200 || 304 ? resp.json() : false))
        .then(setDog)
        .catch(alert);
    };
    getDogData();
  }, [id]);

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
        {userDog.id === dog.id ? 
          <>
            <button className="btn-small bg-yellow larger-text" onClick={()=>{localStorage.removeItem("dog");navigate("/add")}}>Delete</button>
            <Link to={`/edit/${id}`}>
              <button className="btn-small bg-blue larger-text">Edit</button>
            </Link>
          </>
        : <>
            <Link>
              <button className="btn-small bg-yellow larger-text" onClick={() => removeMatch(dog)}>
                <FaTimes />
              </button>
            </Link>
            <Link>
              <button className="btn-small bg-blue larger-text" onClick={() => addMatch(dog)}>
                <FaBone />
              </button>
            </Link>
          </>
        }
      </div>
    </div>
  ) : 
    navigate("/");
};

export default ViewOne;
