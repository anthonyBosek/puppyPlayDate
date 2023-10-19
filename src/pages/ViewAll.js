import { useOutletContext } from "react-router-dom";
import { FaPaw } from "react-icons/fa";
import Card from "../components/Card";

const ViewAll = () => {
  const { dogs, searchTerm } = useOutletContext();
  const unmatches = JSON.parse(localStorage.unmatches || "[]");
  const blockedIds = unmatches.map((doggy) => doggy.id);

  const allDogs = dogs
    .filter(
      (dog) =>
        (dog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dog.bio.toLowerCase().includes(searchTerm.toLowerCase())) &&
        !blockedIds.includes(dog.id)
    )
    .map((dog) => <Card key={dog.id} dog={dog} />);

  return (
    <div className="view-all">
      <h1>
        Our Play Pack
        <span className="paw-icon">
          <FaPaw />
          <FaPaw />
        </span>
      </h1>
      <div className="all-cards">{allDogs}</div>
    </div>
  );
};

export default ViewAll;
