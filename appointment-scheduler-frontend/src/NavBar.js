import axios from "axios";
import React from "react";
import { useHistory, useLocation,Link } from "react-router-dom";

const NavBar=()=>{
    let location=useLocation();
    let history=useHistory();
    const signout=async()=>{
        if(typeof window!=="undefined")
        {
            localStorage.removeItem("jwt");
        }
        history.push("/signin");
        return await axios.get("https://ganeshan-nbyula-appointments.herokuapp.com/auth/signout")
        .then((response)=>{
            // console.log("signout",response);
            // return response.json();
        })
        .catch(err=>console.log(err));
    }
    return(
        <>
            {localStorage.getItem("jwt")==null && 
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" 
                                style={location.pathname==="/"?{color:"#ff9900"}:{color:"#ffffff"}} 
                                to="/"
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" 
                                style={location.pathname==="/signin"?{color:"#ff9900"}:{color:"#ffffff"}} 
                                to="/signin"
                                >
                                    Sign In
                                </Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" 
                                style={location.pathname==="/signup"?{color:"#ff9900"}:{color:"#ffffff"}} 
                                to="/signup"
                                >
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            }
            {localStorage.getItem("jwt") && 
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" 
                            style={location.pathname==="/"?{color:"#ff9900"}:{color:"#ffffff"}} 
                            to="/"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" 
                            style={location.pathname==="/currentappointments"?{color:"#ff9900"}:{color:"#ffffff"}} 
                            to="/currentappointments"
                            >
                                Current Appointments
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" 
                            style={location.pathname==="/scheduleappointment"?{color:"#ff9900"}:{color:"#ffffff"}} 
                            to="/scheduleappointment"
                            >
                                Schedule Appointment
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link 
                            className="nav-link" style={location.pathname===`/user/${JSON.parse(localStorage.getItem("jwt")).user._id}`?{color:"#ff9900"}:{color:"#ffffff"}} 
                            to={`/user/${JSON.parse(localStorage.getItem("jwt")).user._id}`}>
                                My Profile
                            </Link> 
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" style={(location.pathname==="/signout"?{color:"#ff9900"}:{color:"#ffffff"},{cursor:"pointer",color:"#fff"})}
                            onClick={signout}
                            >
                                Sign Out
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            }
        </>
    )
}

//current appointments,schedule appointments,profile

export default NavBar;