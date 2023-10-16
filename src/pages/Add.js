import Form from "../components/Form";
import { useNavigate, useOutletContext } from "react-router-dom";

const Add = () => {
  const authUserID = useOutletContext();
  const navigate = useNavigate();

  const onAddDog = (dogData) => {
    if (dogData) {
      authUserID(dogData.id);
      localStorage.dog = JSON.stringify(dogData)
      navigate(`/profile/${dogData.id}`);
    }
  };

  return (
    <div>
      <h1>Add</h1>
      <Form onAddDog={onAddDog} />
    </div>
  );
};

export default Add;
