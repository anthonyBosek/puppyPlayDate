import { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";
const ViewOne = () => {
  //use state of "" so no loading errors for name not existing
  const [dog, setDog] = useState({name:""}); 

  useEffect(()=>{
    fetch(`http://localhost:3005/dogs/${id}`)
    .then(resp => resp.json())
    .then(setDog)
  },[])
  

  const { id } = useParams();
  return (
    <div className="dogPage">
      <h1>{`${dog.name}${dog.name.endsWith('s') ? ' page' : "'s page"}`}</h1>
      <img src={dog.image} alt={dog.name}/>
      <p>Breed: {dog.breed}</p>
      <p>Age: {dog.age}</p>
      <p>Gender: {dog.gender}</p>
      <p>About: <br/> {dog.bio}</p>
      <p>Owner: {dog.owner}</p>
      <p>Viewing dog with id: {id}</p>
      <Link to={`/edit/${id}`}>
        <button>Edit</button>
      </Link>
      <button>Delete</button>
    </div>
  );
};

export default ViewOne;
