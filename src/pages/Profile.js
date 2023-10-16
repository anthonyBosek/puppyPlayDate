import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    </div>
  );
};

export default Profile;
