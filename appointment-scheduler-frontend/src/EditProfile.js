import React,{useEffect, useState} from "react";
import { Redirect, useParams,Link } from "react-router-dom";
import axios from "axios";
import "./EditProfile.css";
import moment from "moment";
const EditProfile=()=>{
    let { userId } = useParams();
    const [profileState,setProfileState]=useState({});
    const [redirectToSignin,setRedirectToSignin]=useState(false);
    const [formState,setFormState]=useState({
        name:"",
        offDate:""
    })
    const [offHr,setOffHr]=useState("");
    const [offDt,setOffDt]=useState("");
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
    // async function updateUser(userId)
    //     {
    //         if(!localStorage.getItem("jwt"))
    //         {
    //             setRedirectToSignin(true);
    //         }
    //         else
    //         {
    //             // console.log("token from profile:",JSON.parse(localStorage.getItem("jwt")).token);
    //             axios.put(`http://localhost:8082/user/${userId}`,
    //             {
    //                 headers:{
    //                     "Accept":"application/json",
    //                     "Content-Type":"application/json",
    //                     "Authorization":`Bearer ${JSON.parse(localStorage.getItem("jwt")).token}`
    //                 }
    //             })
    //             .then((response)=>{
    //                 // console.log(response);
    //                 if(response.data.error)
    //                 {
    //                     setRedirectToSignin(true);
    //                 }
    //                 else{
    //                     // console.log(response);
    //                     setProfileState(response.data.user);
    //                     setSuccessMessage(res.data.message);
    //                 }
    //             })
    //         }
    //     }
    const clickSubmit=async (e)=>{
        e.preventDefault();
        if(moment(moment(formState.offDate).format("DD-MM-YYYY"),"DD-MM-YYYY",true).isValid()==false && formState.offDate!=null && offHr!=null){
            alert("Wrong Date Format!");
            return;
        }
        const user={
            name:formState.name,
            offDate:formState.offDate,
            offSlot:offHr
        };
        console.log(user);
        axios.put(`http://localhost:8082/user/${userId}`,
        JSON.stringify(user),
        {
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${JSON.parse(localStorage.getItem("jwt")).token}`
            }
        }
        )
        .then((res)=>{
            // console.log(res.data.message);
            setSuccessMessage("Updated Successfully!");
            setFormState({
                name:"",
                offDate:""
            });
            setOffHr("");
            return res;
        })
        .catch((err)=>{
            // console.log(err);
            // console.log(err.response.data.message);
            // setFormState({...formState,error:err.response.data.message?err.response.data.message:err.response.data.validationError});
            setErrorMessage("Couldn't update. For security reasons we have a time limit of your session, if you are logged in from a long time, try logging out and re-login again.If that's not the case then sorry you are UNAUTHORIZED to update the user.");
            return err;
        })
    }
    return(
        <>
            <div className="container text-light">
            <h2 className="mt-5 mb-5">Update</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            {
                successMessage && <div className="alert alert-primary">{successMessage}</div>
            }
            <form>
                <div className="form-group">
                    <label className="text-light">Name</label>
                    <input type="text" className="form-control" onChange={handleChage("name")} value={formState.name}/>
                    
                </div>
                <div className="m-2">
                    <label className="text-light m-1">Off Date</label>
                    <input type="text" placeholder="dd-mm-yyyy" width={"5vh"} className="m-2" onChange={handleChage("offDate")} value={formState.offDate}/>
                </div>
                <div class="btn-group">
                    <button type="button" className="btn dropdown-toggle mx-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {!offHr?"Off Hours":offHr}
                    </button>
                    <div className="dropdown-menu customClassForDropDown">
                        <a className="dropdown-item" value="0-1" onClick={(e)=>{setOffHr("0-1");}}>0-1</a>
                        <a className="dropdown-item" value="1-2" onClick={(e)=>{setOffHr("1-2");}}>1-2</a>
                        <a className="dropdown-item" value="2-3" onClick={(e)=>{setOffHr("2-3");}}>2-3</a>
                        <a className="dropdown-item" value="3-4" onClick={(e)=>{setOffHr("3-4");}}>3-4</a>
                        <a className="dropdown-item" value="4-5" onClick={(e)=>{setOffHr("4-5");}}>4-5</a>
                        <a className="dropdown-item" value="5-6" onClick={(e)=>{setOffHr("5-6");}}>5-6</a>
                        <a className="dropdown-item" value="6-7" onClick={(e)=>{setOffHr("6-7");}}>6-7</a>
                        <a className="dropdown-item" value="7-8" onClick={(e)=>{setOffHr("7-8");}}>7-8</a>
                        <a className="dropdown-item" value="8-9" onClick={(e)=>{setOffHr("8-9");}}>8-9</a>
                        <a className="dropdown-item" value="9-10" onClick={(e)=>{setOffHr("9-10");}}>9-10</a>
                        <a className="dropdown-item" value="10-11" onClick={(e)=>{setOffHr("10-11");}}>10-11</a>
                        <a className="dropdown-item" value="11-12" onClick={(e)=>{setOffHr("11-12");}}>11-12</a>
                        <a className="dropdown-item" value="12-13" onClick={(e)=>{setOffHr("12-13");}}>12-13</a>
                        <a className="dropdown-item" value="13-14" onClick={(e)=>{setOffHr("13-14");}}>13-14</a>
                        <a className="dropdown-item" value="14-15" onClick={(e)=>{setOffHr("14-15");}}>14-15</a>
                        <a className="dropdown-item" value="15-16" onClick={(e)=>{setOffHr("15-16");}}>15-16</a>
                        <a className="dropdown-item" value="16-17" onClick={(e)=>{setOffHr("16-17");}}>16-17</a>
                        <a className="dropdown-item" value="17-18" onClick={(e)=>{setOffHr("17-18");}}>17-18</a>
                        <a className="dropdown-item" value="18-19" onClick={(e)=>{setOffHr("18-19");}}>18-19</a>
                        <a className="dropdown-item" value="19-20" onClick={(e)=>{setOffHr("19-20");}}>19-20</a>
                        <a className="dropdown-item" value="20-21" onClick={(e)=>{setOffHr("20-21");}}>20-21</a>
                        <a className="dropdown-item" value="21-22" onClick={(e)=>{setOffHr("21-22");}}>21-22</a>
                        <a className="dropdown-item" value="22-23" onClick={(e)=>{setOffHr("22-23");}}>22-23</a>
                        <a className="dropdown-item" value="23-00" onClick={(e)=>{setOffHr("23-0");}}>23-00</a>
                    </div>
                </div>
                <button onClick={(e)=>clickSubmit(e)} className="btn btn-raised btn-primary mx-2">Submit</button>
            </form>
        </div>
        </>
    )
}


export default EditProfile;