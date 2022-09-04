import React,{useEffect, useState} from "react";
import { Redirect, useParams,Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile=()=>{
    let { userId } = useParams();
    const [profileState,setProfileState]=useState({});
    const [redirectToSignin,setRedirectToSignin]=useState(false);
    const showToastMessage = () => {
        toast.warning('Click on Edit Profile to mark your off hours and to update your Name.', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    useEffect(()=>{showToastMessage()},[]);
    useEffect(()=>{
        async function fetchUser(userId)
        {
            if(!localStorage.getItem("jwt"))
            {
                setRedirectToSignin(true);
            }
            else
            {
                // console.log("token from profile:",JSON.parse(localStorage.getItem("jwt")).token);
                axios.get(`https://ganeshan-nbyula-appointments.herokuapp.com/user/${userId}`,
                {
                    headers:{
                        "Accept":"application/json",
                        "Content-Type":"application/json",
                        // "Authorization":`Bearer ${JSON.parse(localStorage.getItem("jwt")).token}`
                    }
                })
                .then((response)=>{
                    // console.log(response);
                    if(response.data.error)
                    {
                        setRedirectToSignin(true);
                    }
                    else{
                        // console.log(response);
                        setProfileState(response.data.user);
                    }
                })
            }
        }
        fetchUser(userId);
    },[userId]);
    const checkAuth=()=>{
        if(typeof window=="undefined")
        {
            return false;
        }
        else
        {
            if(localStorage.getItem("jwt"))
            {
                if(JSON.parse(localStorage.getItem("jwt")).user._id==userId)
                {
                    return "you";
                }
                else
                {
                    return "notyou"
                }
            }
            else
            {
                return false;
            }
        }
    }
    // if(redirectToSignin==true)
    // {
    //     return <Redirect to="/signin"/>
    // }
    return(
        <>
            <ToastContainer/>
            {/* {checkAuth()=="you" &&
                <div className="container">
                    <h2 className="mt-5 mb-5">Profile</h2>
                </div>
            }
            {checkAuth()=="notyou" &&
                <div className="container">
                    <h2 className="mt-5 mb-5">Someone's Profile</h2>
                </div>
            }
            {!checkAuth() &&
                <div className="container">
                    <h2 className="mt-5 mb-5">Not Auth</h2>
                </div>
            } */}
            {redirectToSignin && <Redirect to="/signin"/>}
            <div className="container text-light">
                <div className="row">
                    <div className="col-md-6">
                        <h2 className="mt-5 mb-5">Profile</h2>
                        <div className="jumbotron text-dark">
                            {JSON.parse(localStorage.getItem("jwt")).user._id==userId && profileState.name && 
                                <>
                                    <p className="font-weight-bold">Hello, {profileState.name} !</p>
                                    <p className="font-weight-bold">Email: {profileState.email}</p>
                                    <p className="font-weight-bold">Joined on: {new Date(profileState.created).toDateString()}</p>
                                </>
                            }
                        </div>
                    </div>
                    <div className="col-md-6">
                        {JSON.parse(localStorage.getItem("jwt")).user._id==userId && 
                            (<div className="d-inline-block mt-5">
                                <Link className="btn btn-raised btn-success mr-5"
                                to={`/user/edit/${userId}`}
                                >
                                    Edit Profile
                                </Link>
                                
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;