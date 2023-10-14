import Card from "../components/Card";
import { useEffect, useState } from "react";
// temporary to see things work...
// const dogs = [
//   {
//     id: 1,
//     name: "Fido",
//     age: 3,
//   },
//   {
//     id: 2,
//     name: "Rover",
//     age: 4,
//   },
//   {
//     id: 3,
//     name: "Rex",
//     age: 6,
//   },
// ];
// end temporary

const ViewAll = () => {
  const [dogs,setDogs] = useState([])
  
  useEffect(()=>{
    fetch("http://localhost:3005/dogs")
    .then(resp => resp.json())
    .then(setDogs)
  },[])

  const allDogs = dogs.map((dog) => <Card key={dog.id} dog={dog} />);
  return (
    <div>
      <h1>ViewAll</h1>
      <div className="all-cards">{allDogs}</div>
    </div>
  );
};

export default ViewAll;
