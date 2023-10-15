import Form from "../components/Form";
import { useOutletContext } from "react-router-dom";

const Add = () => {
  const changeCurrentDog = useOutletContext()
  return (
    <div>
      <h1>Add</h1>
      <Form onAddDog={changeCurrentDog}/>
    </div>
  );
};

export default Add;
