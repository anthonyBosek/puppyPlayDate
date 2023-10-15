import { useState } from "react";

const Form = () => {
  const initialValue = {
    owner: "",
    name: "",
    breed: "",
    age: "",
    gender: "",
    image: "",
    bio: ""
  }
  const[formData, setFormData] = useState(initialValue)

  const handleChange = (e) => {
    console.log(e.target.value)
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="owner">Owner name:</label>
        <input type="text" name="owner" id="owner" value={formData.owner} onChange={handleChange} />

        <label htmlFor="name">Pet name:</label>
        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} />

        <label htmlFor="breed">Breed:</label>
        <input type="text" name="breed" id="breed" value={formData.breed} onChange={handleChange} />

        <label htmlFor="age">Age:</label>
        <input type="number" name="age" id="age" value={formData.age} onChange={handleChange} />

        <label htmlFor="female">
          <input type="radio" name="gender" value="female" checked={formData.gender === "female"} onChange={handleChange} /> 
          Female
        </label>
        <label htmlFor="male">
          <input type="radio" name="gender" value="male" checked={formData.gender === "male"} onChange={handleChange} /> 
          Male
        </label>

        <label htmlFor="image">Image:</label>
        <input type="text" name="image" id="image" value={formData.image} onChange={handleChange} />

        <label htmlFor="bio">About me:</label>
        <textarea name="bio" id="bio" value={formData.bio} onChange={handleChange} />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Form;
