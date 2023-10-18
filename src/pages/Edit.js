import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import Form from "../components/Form";

const Edit = () => {
  const { setAlertMessage, handleSnackType } = useOutletContext();
  const { id } = useParams();
  const [selectDog, setSelectDog] = useState({});

  useEffect(() => {
    const getSelectDogData = () => {
      fetch(`http://localhost:3005/dogs/${id}`)
        .then((res) => res.json())
        .then(setSelectDog)
        .catch((err) => console.log(err));
    };
    getSelectDogData();
  }, [id]);

  const onEditDog = () => {
    // redirect
    handleSnackType("success");
    setAlertMessage("Profile updated!");
  };

  return (
    <div>
      {console.log(selectDog)}
      <h1>Edit User Data</h1>
      <Form selectedDogId={selectDog.id} onEditDog={onEditDog} />
    </div>
  );
};

export default Edit;
