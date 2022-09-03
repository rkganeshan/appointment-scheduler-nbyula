import React,{useState} from "react";
import axios from "axios";
const Signup=()=>{
    const [formState,setFormState]=useState({
        name:"",
        email:"",
        password:"",
    })
    const [successMessage,setSuccessMessage]=useState("");
    const [errorMessage,setErrorMessage]=useState("");
    const handleChage=name=>(event)=>{
        if(successMessage!="")
        {
            setSuccessMessage("");
        }
        if(errorMessage!="")
        {
            setErrorMessage("");
        }
        setFormState({...formState,[name]:event.target.value});
    }
    const clickSubmit=async (e)=>{
        e.preventDefault();
        const user={
            name:formState.name,
            email:formState.email,
            password:formState.password
        };
        console.log(user);
        axios.post("http://localhost:8082/auth/signup",
        JSON.stringify(user),
        {
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            }
        }
        )
        .then((res)=>{
            // console.log(res.data.message);
            setSuccessMessage(res.data.message);
            setFormState({
                name:"",
                email:"",
                password:"",
                error:""
            });
            return res;
        })
        .catch((err)=>{
            // console.log(err);
            // console.log(err.response.data.message);
            // setFormState({...formState,error:err.response.data.message?err.response.data.message:err.response.data.validationError});
            setErrorMessage(err.response.data.message?err.response.data.message:err.response.data.validationError);
            return err;
        })
    }
    return(
        <div className="container text-light">
            <h2 className="mt-5 mb-5">Signup</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            {
                successMessage && <div className="alert alert-primary">{successMessage}</div>
            }
            <form>
                <div className="form-group">
                    <label className="text-light">Name</label>
                    <input type="text" className="form-control" onChange={handleChage("name")} value={formState.name}/>
                </div>
                <div className="form-group">
                    <label className="text-light">Email</label>
                    <input type="email" className="form-control" onChange={handleChage("email")} value={formState.email}/>
                </div>
                <div className="form-group">
                    <label className="text-light">Password</label>
                    <input type="password" className="form-control" onChange={handleChage("password")} value={formState.password}/>
                </div>
                <button onClick={clickSubmit} className="btn btn-raised btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup;