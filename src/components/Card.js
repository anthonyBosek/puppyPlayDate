import { Link } from "react-router-dom";

const Card = ({ dog }) => {
  return (
    <div className="dog-card">
      <img className="dog-img" src={dog.image} alt={dog.name} />
      <h2>
        {dog.name}, <span>{dog.age}</span>
      </h2>
      <Link to={`/dogs/${dog.id}`}>
        <button className="btn-small bg-blue">View</button>
      </Link>
    </div>
  );
};

export default Card;
