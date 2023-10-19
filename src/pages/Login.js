import bcrypt from "bcryptjs";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const Login = () => {
    const { setAlertMessage, handleSnackType } = useOutletContext();
    const [allDogs, setAllDogs] = useState([]);
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3005/dogs")
            .then((resp) => resp.json())
            .then(setAllDogs);
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        findUser();
    };

    const updatePass = (e) => {
        setPass(e.target.value);
    };

    const handleLogin = (dog) => {
        localStorage.setItem("dog", JSON.stringify(dog));
        navigate("/profile");
        handleSnackType("success");
        setAlertMessage("Welcome back!");
    };

    const findUser = () => {
        if (pass.length >= 4) {
            bcrypt.hash(pass, 10, (err, hash) => {
                if (err) {
                    handleSnackType("error");
                    setAlertMessage("Error hashing password");
                } else if (hash) {
                    (async () => {
                        const foundDogs = await Promise.all(allDogs.map(async (dog) => {
                            if (dog.password) {
                                const data = await bcrypt.compare(pass, dog.password);
                                if (data) {
                                    console.log(data);
                                    handleLogin(dog);
                                    return dog; // Include the dog in the filtered array
                                }
                            }
                            return null; // Don't include the dog in the filtered array
                        }));

                        const filteredDogs = foundDogs.filter((dog) => dog !== null);
                        if(filteredDogs.length<1){
                            handleSnackType("error");
                            setAlertMessage("No users with that password");
                        }
                        console.log(filteredDogs);
                    })()
                    
                }
            });
        } else {
            handleSnackType("error");
            setAlertMessage("Please enter a password with at least 4 characters");
        }
    };

    return (
        <>
            <h1>Puppy Login 🐾</h1>
            <form id="login">
                <label htmlFor="password" className="col-6">
                    Password:
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={pass}
                        onChange={updatePass}
                    />
                </label>
                <button
                    onClick={handleClick}
                    className="btn-small bg-yellow larger-text"
                >
                    Log In
                </button>
            </form>
        </>
    );
};

export default Login;


// (error, result) => {
//     if (result) {
//         handleLogin(dog);
//     } else {
//         console.log("test")
//         handleSnackType("error");
//         setAlertMessage("No users with that password");
//     }
// }
// else {
//     handleSnackType("error");
//     setAlertMessage("No users with that password");
// }