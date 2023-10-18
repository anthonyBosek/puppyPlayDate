import bcrypt from "bcryptjs"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () =>{
    const [allDogs,setAllDogs] = useState([])
    const [pass,setPass] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
        fetch("http://localhost:3005/dogs")
        .then(resp => resp.json())
        .then(setAllDogs)
    },[])

    const handleClick = () =>{
        findUser()
    }

    const updatePass = (e) =>{
        setPass(e.target.value)
    }

    const handleLogin = (dog) =>{
        localStorage.setItem("dog",JSON.stringify(dog))
        navigate("/profile")
    }

    const findUser = () =>{
        if(pass){
            bcrypt.hash(pass,10,(err,hash)=>{
                if(err){
                    console.log("Error hashing password")
                }else if(hash){
                    // console.log(hash)
                    allDogs.forEach(dog => {
                        if(dog.password){
                            bcrypt.compare(pass,dog.password,(error,result)=>{
                                if(result){
                                    handleLogin(dog)
                                }else{
                                    console.log("No users with that password")
                                }
                            })
                        }
                    })
                }
            })
        }else{
            console.log("Please enter a password")
        }
        
        // const user = allDogs.find(dog => dog.password)
    }

    
    return(
        <>
        <h1>Login</h1>
        <input
        type="text"
        value={pass}
        onChange={updatePass}
        />
        <button onClick={handleClick}>Log In</button>
        </>
    )
}

export default Login