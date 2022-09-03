import React from "react";
import {Route,Switch,BrowserRouter} from "react-router-dom";
import CurrentAppointments from "./CurrentAppointments";
import EditProfile from "./EditProfile";
import LandingPage from "./LandingPage";
import NavBar from "./NavBar";
import NotFound from "./NotFound";
import Profile from "./Profile";
import ScheduleAppointment from "./ScheduleAppointment";
import Signin from "./Signin";
import Signup from "./Signup";

const AppRouter=()=>{
    return(
        <>
            <BrowserRouter>
            <NavBar/>
                <Switch>
                    <Route exact path="/" component={LandingPage}/>
                    <Route exact path="/signin" component={Signin}/>
                    <Route exact path="/signup" component={Signup}/>
                    <Route exact path="/user/:userId" component={Profile}/>
                    <Route exact path="/user/edit/:userId" component={EditProfile}/>
                    <Route exact path="/currentappointments" component={CurrentAppointments}/>
                    <Route exact path="/scheduleappointment" component={ScheduleAppointment}/>
                    <Route exact component={NotFound}/>
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default AppRouter;