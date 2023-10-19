import { useState, useEffect } from "react";
import { object, string, number } from "yup";
import { useOutletContext, useNavigate } from "react-router-dom";
import PasswordStrengthBar from "react-password-strength-bar";
import bcrypt from "bcryptjs";

const URL = "http://localhost:3005/dogs";

const initialValue = {
  owner: "",
  name: "",
  breed: "",
  age: "",
  gender: "",
  image: "",
  bio: "",
  password: "",
};

const formSchema = object().shape({
  owner: string().required("Owner name is required"),
  name: string().required("Pet name is required"),
  breed: string().required("Breed is required"),
  age: number()
    .min(0, "Not a valid age")
    .max(35, "Not a valid age")
    .required("Age is required"),
  gender: string().required("Gender is required"),
  image: string().required("Image is required"),
  bio: string().required("Bio is required"),
  password: string()
    .min(4, "Password must be at least 4 characters long")
    .required("Password is required"),
});

const Form = ({ selectedDogId, onEditDog, onAddDog, edit }) => {
  const navigate = useNavigate();
  const { setAlertMessage, handleSnackType } = useOutletContext();
  const [formData, setFormData] = useState(initialValue);
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  useEffect(() => {
    const getFormData = () => {
      if (selectedDogId) {
        fetch(`${URL}/${selectedDogId}`)
          .then((resp) => resp.json())
          .then(setFormData)
          .catch((err) => {
            handleSnackType("error");
            setAlertMessage(err.message);
          });
      }
    };
    getFormData();
  }, [selectedDogId]); // eslint-disable-line react-hooks/exhaustive-deps

  const checkForReusedPass = async (pass) => {
    const resp = await fetch("http://localhost:3005/dogs");
    const data = await resp.json();
    let reused = true;
    for (const dog of data) {
      if (dog.password) {
        const success = await bcrypt.compare(pass, dog.password);
        if (success) {
          reused = false;
          break;
        }
      }
    }
    return reused;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newForm;
    if (name === "age") {
      newForm = { ...formData, [name]: parseInt(value) };
      setFormData(newForm);
    } else {
      newForm = { ...formData, [name]: value };
      setFormData(newForm);
    }
    formSchema
      .validate(newForm)
      .then(() => {
        setReadyToSubmit(true);
      })
      .catch(() => {
        setReadyToSubmit(false);
      });
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
      checkForReusedPass(validData.password).then((result) => {
        if (result) {
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
        } else {
          handleSnackType("error");
          setAlertMessage("Please choose a different password");
        }
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
          {!edit ? (
            <label htmlFor="password" className="col-6">
              Password:
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
              />
              <PasswordStrengthBar
                style={{ width: "30%" }}
                password={formData.password}
              />
            </label>
          ) : null}
          {readyToSubmit ? (
            <input
              type="submit"
              value="Submit"
              className="btn-large bg-yellow larger-text"
            />
          ) : (
            <input
              type="submit"
              value="Submit"
              disabled
              className="btn-large bg-yellow larger-text"
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default Form;
