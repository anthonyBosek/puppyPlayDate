import Card from "../components/Card";
import { useEffect, useState } from "react";

const ViewAll = () => {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3005/dogs")
      .then((resp) => resp.json())
      .then(setDogs);
  }, []);

  const allDogs = dogs.map((dog) => <Card key={dog.id} dog={dog} />);
  return (
    <div className="view-all">
      <h1>ViewAll</h1>
      <div className="all-cards">{allDogs}</div>
    </div>
  );
};

export default ViewAll;
