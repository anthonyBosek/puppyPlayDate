import Form from "../components/Form";
import { useNavigate, useOutletContext } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();

  const onAddDog = (dogData) => {
    if (dogData) {
      localStorage.dog = JSON.stringify(dogData);
      navigate(`/profile`);
    }
  };

  return (
    <div>
      <h1>Create Play Profile</h1>
      <Form onAddDog={onAddDog} />
    </div>
  );
};

export default Add;
