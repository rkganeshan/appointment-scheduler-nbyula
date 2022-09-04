import axios from "axios";
import React, { useEffect ,useState} from "react";
import moment from "moment";

const CurrentAppointments=()=>{
    const [curApp,setCurrApp]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:8082/appointment",{
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${JSON.parse(localStorage.getItem("jwt")).token}`
            }
        }).then((res)=>{
            console.log(res.data.appointments);
            setCurrApp(res.data.appointments);
        })
    },[]);
    return(
        <>
        {curApp.length==0 && <div className="jumbotron m-3">
            <p className="font-weight-bold h3">No Appointments currently.</p>
            </div>
        }
        <div className="container m-3">
            <div className="row">
                {curApp.length>0 && 
                    curApp.map((item,idx)=>{
                        return(
                            <div className="col-sm-6 col-md-4 col-lg-4 d-flex align-items-stretch mt-2">
                                <div class="card" style={{"width":"25rem"}}>
                                    <div class="card-body">
                                        <h5 class="card-title">Title:{" "+item.title}</h5>
                                        <p class="card-text">Agenda:{" "+item.agenda}</p>
                                        <p class="card-text">Time:{" "+ moment(item.time.split('T')[0]).format("DD-MM-YYYY") +" at "+item.time.split('T')[1].split('.')[0]
                                        // 2022-09-08T22:00:00.000Z
                                            // moment(item.time).calendar().split("/").join("-")+" "+moment(item.time).toJSON().split("T")[1].split(":")[0]+":00:00"
                                        }</p>                                        
                                        <p class="card-text">With: {JSON.parse(localStorage.getItem("jwt")).user._id==item.host._id?item.guest.name:item.host.name}</p>                                        
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        
        </>
    )
}


export default CurrentAppointments;