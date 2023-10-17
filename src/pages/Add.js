import Form from "../components/Form";
import { useNavigate, useOutletContext } from "react-router-dom";

const Add = () => {
  const [authUserID,_] = useOutletContext();
  const navigate = useNavigate();
console.log(authUserID)
  const onAddDog = (dogData) => {
    if (dogData) {
      authUserID(dogData.id);
      localStorage.dog = JSON.stringify(dogData);
      navigate(`/dogs/${dogData.id}`);
    }
  };

  return (
    <div>
      <h1>Create User Profile</h1>
      <Form onAddDog={onAddDog} />
    </div>
  );
};

export default Add;
