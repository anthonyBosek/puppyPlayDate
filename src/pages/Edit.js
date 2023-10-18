import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";



const Edit = () => {
  const navigate = useNavigate()
  const { setAlertMessage, handleSnackType } = useOutletContext();
  const dog = JSON.parse(localStorage.dog || "[]")
  const [selectDog, setSelectDog] = useState({});

  useEffect(() => {
    if(dog.id){
    const getSelectDogData = () => {
      fetch(`http://localhost:3005/dogs/${dog.id}`)
        .then((res) => res.json())
        .then(setSelectDog)
        //snackbar
        .catch((err) => console.log(err));
    };
    getSelectDogData();
   }else{
    navigate("/")
   } 
  }, [dog.id]);

  const onEditDog = () => {
    // redirect
    handleSnackType("success");
    setAlertMessage("Profile updated!");
  };

  return (
    <div>
      <h1>Edit User Data</h1>
      <Form selectedDogId={selectDog.id} onEditDog={onEditDog} edit={true}/>
    </div>
  );
};

export default Edit;
