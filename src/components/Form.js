import { useState, useEffect } from "react";
import { object, string } from "yup";
import { useOutletContext, useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs'

const URL = "http://localhost:3005/dogs";

const initialValue = {
  owner: "",
  name: "",
  breed: "",
  age: "",
  gender: "",
  image: "",
  bio: "",
  password: ""
};

const formSchema = object().shape({
  owner: string().required("Owner name is required"),
  name: string().required("Pet name is required"),
  breed: string().required("Breed is required"),
  age: string().required("Age is required"),
  gender: string().required("Gender is required"),
  image: string().required("Image is required"),
  bio: string().required("Bio is required"),
  password: string().required("Password is required")
});

const Form = ({ selectedDogId, onEditDog, onAddDog, edit }) => {
  const navigate = useNavigate();
  const { setAlertMessage, handleSnackType } = useOutletContext();
  const [formData, setFormData] = useState(initialValue);

  useEffect(() => {
    const getFormData = () => {
      if (selectedDogId) {
        fetch(`${URL}/${selectedDogId}`)
          .then((resp) => resp.json())
          .then(setFormData)
          .catch((err) => alert(err));
      }
    };
    getFormData();
  }, [selectedDogId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${URL}/${selectedDogId || ""}`;
    const method = selectedDogId ? "PATCH" : "POST";
  
    try {
      const validData = await formSchema.validate(formData);
      const hash = await new Promise((resolve, reject) => {
        bcrypt.hash(validData.password, 10, (err, hash) => {
          if (err) {
            reject(err);
          } else {
            resolve(hash);
          }
        });
      });
  
      const processedForm = { ...validData, password: hash };
  
      fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(processedForm),
      })
        .then((resp) => resp.json())
        .then((dogData) => {
          if (selectedDogId) {
            onEditDog(dogData);
            navigate("/profile");
          } else {
            onAddDog(dogData);
            handleSnackType("success");
            setAlertMessage("You're all set!");
          }
          setFormData(initialValue);
        })
        .catch((err) => {
          handleSnackType("error");
          setAlertMessage(err.message);
        });
    } catch (err) {
      handleSnackType("error");
      setAlertMessage(err.message);
    }
  };
  
  return (
    <div>
      <div className="form-div">
        <form onSubmit={handleSubmit}>
          <label htmlFor="owner" className="col-3">
            Owner name:
            <input
              type="text"
              name="owner"
              id="owner"
              value={formData.owner}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="name" className="col-3">
            Pet name:
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="breed" className="col-2">
            Breed:
            <input
              type="text"
              name="breed"
              id="breed"
              value={formData.breed}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="age" className="col-2">
            Age:
            <input
              type="number"
              name="age"
              id="age"
              value={formData.age}
              onChange={handleChange}
            />
          </label>

          <fieldset id="flex" className="col-2">
            <label htmlFor="female" className="inline-block">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
                className="inline-block"
              />
              Female
            </label>
            <label htmlFor="male" className="inline-block">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
                className="inline-block"
              />
              Male
            </label>
          </fieldset>

          <label htmlFor="image" className="col-6">
            Image:
            <input
              type="text"
              name="image"
              id="image"
              value={formData.image}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="bio" className="col-6">
            About me:
            <textarea
              name="bio"
              id="bio"
              value={formData.bio}
              onChange={handleChange}
            />
          </label>
          {!edit ?
          <label htmlFor="password" className="col-6">
            Password
            <input
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label> : null}

          <input
            type="submit"
            value="Submit"
            className="btn-large bg-yellow larger-text"
          />
        </form>
      </div>
    </div>
  );
};

export default Form;
