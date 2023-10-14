import { Link, useParams } from "react-router-dom";
const ViewOne = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>View One</h1>
      <p>Viewing dog with id: {id}</p>
      <Link to={`/edit/${id}`}>
        <button>Edit</button>
      </Link>
      <button>Delete</button>
    </div>
  );
};

export default ViewOne;
