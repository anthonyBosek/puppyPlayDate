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
      <form onSubmit={handleSubmit}>
        <label htmlFor="owner">Owner name:</label>
        <input
          type="text"
          name="owner"
          id="owner"
          value={formData.owner}
          onChange={handleChange}
        />

        <label htmlFor="name">Pet name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="breed">Breed:</label>
        <input
          type="text"
          name="breed"
          id="breed"
          value={formData.breed}
          onChange={handleChange}
        />

        <label htmlFor="age">Age:</label>
        <input
          type="number"
          name="age"
          id="age"
          value={formData.age}
          onChange={handleChange}
        />

        <label htmlFor="female">
          <input
            type="radio"
            name="gender"
            value="female"
            checked={formData.gender === "female"}
            onChange={handleChange}
          />
          Female
        </label>
        <label htmlFor="male">
          <input
            type="radio"
            name="gender"
            value="male"
            checked={formData.gender === "male"}
            onChange={handleChange}
          />
          Male
        </label>

        <label htmlFor="image">Image:</label>
        <input
          type="text"
          name="image"
          id="image"
          value={formData.image}
          onChange={handleChange}
        />

        <label htmlFor="bio">About me:</label>
        <textarea
          name="bio"
          id="bio"
          value={formData.bio}
          onChange={handleChange}
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Form;
