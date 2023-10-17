import { useState, useEffect } from "react";

const URL = "http://localhost:3005/dogs";
const initialValue = {
  owner: "",
  name: "",
  breed: "",
  age: "",
  gender: "",
  image: "",
  bio: "",
};

const Form = ({ selectedDogId, onEditDog, onAddDog }) => {
  const [formData, setFormData] = useState(initialValue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (selectedDogId) {
      fetch(`${URL}/${selectedDogId}`)
        .then((resp) => resp.json())
        .then(setFormData)
        .catch((err) => alert(err));
    }
  }, [selectedDogId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = `${URL}/${selectedDogId || ""}`;
    const method = selectedDogId ? "PATCH" : "POST";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((dogData) => {
        if (selectedDogId) {
          onEditDog(dogData);
        } else {
          onAddDog(dogData);
        }
        setFormData(initialValue);
      })
      .catch((err) => alert(err));
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
