import bcrypt from "bcryptjs"
import { useEffect, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"


const Login = () =>{
    const { setAlertMessage, handleSnackType } = useOutletContext();
    const [allDogs, setAllDogs] = useState([])
    const [pass, setPass] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
        fetch("http://localhost:3005/dogs")
        .then(resp => resp.json())
        .then(setAllDogs)
    },[])

    const handleClick = (e) =>{
        e.preventDefault()
        findUser()
    }

    const updatePass = (e) =>{
        setPass(e.target.value)
    }

    const handleLogin = (dog) =>{
        localStorage.setItem("dog",JSON.stringify(dog))
        navigate("/profile")
        handleSnackType("success");
        setAlertMessage("Welcome back!");
    }

    const findUser = () =>{
        if(pass.length>=4){
            bcrypt.hash(pass,10,(err,hash)=>{
                if(err){
                    handleSnackType("error");
                    setAlertMessage("Error hashing password");
                }else if(hash){
                    allDogs.forEach(dog => {
                        if(dog.password){
                            bcrypt.compare(pass,dog.password,(error,result)=>{
                                if(result){
                                    handleLogin(dog)
                                }else{
                                    handleSnackType("error");
                                    setAlertMessage("No users with that password");
                                }
                            })
                        }
                    })
                }
            })
        }else{
            handleSnackType("error");
            setAlertMessage("Please enter a password with at least 4 characters");
        }
    }

    
    return(
        <>
            <h1>Login</h1>
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
                <button onClick={handleClick} className="btn-small bg-yellow larger-text">Log In</button>
            </form>
        </>
    )
}

export default Login