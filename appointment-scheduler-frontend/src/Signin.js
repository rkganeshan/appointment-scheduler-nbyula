import React,{useState} from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
const Signin=()=>{
    const [formState,setFormState]=useState({
        email:"",
        password:"",
        redirectToReferer:false,
        loading:false
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
        setFormState(params => ({
            ...params,             // Reuse the previous properties
            [name]: event.target.value, // Overwrite the new ones
        }))
        // setFormState({...formState,[name]:event.target.value});
    }
    const clickSubmit=async (e)=>{
        e.preventDefault();
        setFormState(params=>({
            ...params,
            loading:true
        }))
        // setFormState({...formState,loading:true});
        const user={
            email:formState.email,
            password:formState.password
        };
        console.log(user);
        axios.post("http://localhost:8082/auth/signin",
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
            setFormState(params=>({
                ...params,
                email:"",
                password:""
            }))
            // setFormState({
            //     email:"",
            //     password:"",
            // });
            // res.data.user.hashed_password="";
            // res.data.user.__v="";
            if(typeof window !=="undefined")
            {
                console.log("53 inside...");
                localStorage.setItem("jwt",JSON.stringify(res.data))
                setFormState(params=>({
                    ...params,
                    redirectToReferer:true
                }))
                // setFormState({...formState,redirectToReferer:true})
            }
            console.log(res);
            setFormState(params=>({
                ...params,
                loading:false
            }))
            // setFormState({...formState,loading:false});
            return res;
        })
        .catch((err)=>{
            // console.log(err);
            // console.log(err.response.data.message);
            // setFormState({...formState,error:err.response.data.message?err.response.data.message:err.response.data.validationError});
            setErrorMessage(err.response.data.message?err.response.data.message:err.response.data.validationError);
            setFormState(params=>({
                ...params,
                loading:false
            }))
            // setFormState({...formState,loading:false});
            return err;
        })
    }
    if(formState.redirectToReferer==true)
    {
        return <Redirect to="/"/>
    }
    return(
        <div className="container text-light">
                    <h2 className="mt-5 mb-5">Sign In</h2>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    {successMessage && <div className="alert alert-primary">{successMessage}</div>}
                    {formState.loading && <div className="jumbotron text-center">Loading...</div>}
                    <form>
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

export default Signin;