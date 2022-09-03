import React from "react";
import { Link ,useHistory} from "react-router-dom";
const NotFound=()=>{
    const history=useHistory();
    const goToMain=()=>{
        history.push("/");
    }
    return(
        <>
        <div className="container">
        <div className="row">
            <div className="col-lg-6">
                <div className="jumbotron m-3 mt-5">
                    <h3 className="lead">
                        Uh Oh! You've bumped into a "Page Not Found" zone!
                    </h3>
                    <hr className="my-4"/>
                    <p className="lead">
                        {/* <Link to="/" className="btn btn-danger text-white">Take me to Home!</Link> */}
                        <button className="btn btn-danger text-white" onClick={goToMain}>Take me to Home!</button>
                    </p>
                </div>
            </div>
            <div className="col-lg-3">
            
            </div>
            <div className="col-lg-3">
           
            </div>
        </div>
        </div>
            
        </>
        
    )
}

export default NotFound;