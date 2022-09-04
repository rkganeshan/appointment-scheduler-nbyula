import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";

const ScheduleAppointment=()=>{
    const [allUsers,setAllUsers]=useState([]);
    const [user,setUser]=useState("");
    const [formState,setFormState]=useState({
        title:"",
        agenda:"",
        offDate:""
    })
    const [offHr,setOffHr]=useState("");
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
        // moment(moment(formState.offDate).format("DD-MM-YYYY"),"DD-MM-YYYY",true).isValid()==false
        // let tarr=formState.offDate.trim().split("-");
        setSuccessMessage("");
        setErrorMessage("");
        if(!formState.title || !formState.agenda || !formState.offDate || !offHr)
        {
            alert("All fields are mandatory to schedule an appointment.");
            return;
        }
        let momentDate="";
        let dateStr="";
        let dateArr=formState.offDate?.split("-");
        if(dateArr[0]?.length!=2)
        {
            dateArr[0]="0"+dateArr[0];
        }
        if(dateArr[1]?.length!=2)
        {
            dateArr[1]="0"+dateArr[1];
        }
        dateStr=dateArr[2]+"-"+dateArr[1]+"-"+dateArr[0];
        momentDate=moment(dateStr);
        console.log("momentDate:",momentDate);
        if(!momentDate.isValid())
        {
            alert("Invalid Date!");
            return;
        }
        // let d=new Date(parseInt(tarr[2]),parseInt(tarr[1])-1,parseInt(tarr[0]),parseInt(offHr.trim().charAt(0)),0,0,0)
        // if(!d){
        //     alert("Wrong Date Format!");
        //     return;
        // }
        let strH="";
        let h=parseInt(offHr.split("-")[0]);
        if(h<10)
        {
            strH="0"+h;
        }
        else
        {
        strH=strH+h;
        }
        //30-09-2022
        // "2022-09-30"
        // let finalTime=momentDate._i.split("-").reverse().join("-")+"T"+strH+":00:00.000Z";
        let finalTime=momentDate._i+"T"+strH+":00:00.000Z";
        console.log("73 final time::",finalTime);
        finalTime=moment(finalTime);
        console.log("75 final time::",finalTime);
        const appointment={
            title:formState.title,
            agenda:formState.agenda,
            // time:new Date(parseInt(tarr[2]),parseInt(tarr[1])-1,parseInt(tarr[0]),parseInt(offHr.charAt(0)),0,0),
            time:finalTime,
            // offDate:formState.offDate,
            // offSlot:offHr
        };
        console.log(appointment);
        axios.post(`http://localhost:8082/appointment/${user._id}`,
        JSON.stringify(appointment),
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
            setSuccessMessage("Created Successfully!");
            setFormState({
                title:"",
                agenda:"",
                offDate:""
            });
            setOffHr("");
            return res;
        })
        .catch((err)=>{
            // console.log(err);
            // console.log(err.response.data.message);
            // setFormState({...formState,error:err.response.data.message?err.response.data.message:err.response.data.validationError});
            // setErrorMessage("Couldn't update. For security reasons we have a time limit of your session, if you are logged in from a long time, try logging out and re-login again.If that's not the case then sorry you are UNAUTHORIZED to update the user.");
            if(err.response.data.message)
            {
                setErrorMessage(err.response.data?.message?err.response.data?.message:err.response.data?.validationError);
            }
            else
            {
                setErrorMessage("Couldn't update. For security reasons we have a time limit of your session, if you are logged in from a long time, try logging out and re-login again.If that's not the case then sorry you are UNAUTHORIZED to update the user.");
            }
            return err;
        })
    }
    useEffect(()=>{
        axios.get("http://localhost:8082/user")
        .then((res)=>{
            setAllUsers(res.data.users);
        })
    },[])
    return(
        <>
            <div className="container text-light">
            <h2 className="mt-5 mb-5">Create</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            {
                successMessage && <div className="alert alert-primary">{successMessage}</div>
            }
            <form>
                <div className="form-group">
                    <label className="text-light">Title</label>
                    <input type="text" className="form-control" onChange={handleChage("title")} value={formState.title}/>
                    
                </div>
                <div className="form-group">
                    <label className="text-light">Agenda</label>
                    <input type="text" className="form-control" onChange={handleChage("agenda")} value={formState.agenda}/>
                    
                </div>
                <div className="m-2">
                    <label className="text-light m-1">Date</label>
                    <input type="text" placeholder="dd-mm-yyyy" width={"5vh"} className="m-2" onChange={handleChage("offDate")} value={formState.offDate}/>
                </div>
                <div className="btn-group">
                    <button type="button" className="btn dropdown-toggle mx-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {!offHr?"Meeting Time":offHr}
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
                {/*  */}
                <div className="btn-group">
                    <button type="button" className="btn dropdown-toggle mx-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {!user?"Choose Guest":user.name}
                    </button>
                    <div className="dropdown-menu customClassForDropDown">
                        {allUsers.length>0 && allUsers.map((item,idx)=>{
                            if(JSON.parse(localStorage.getItem("jwt")).user._id!=item._id)
                            {
                                return(
                                    <a className="dropdown-item" key={idx} onClick={(e)=>{setUser(item);}}>{item.name}</a>
                                )
                            }
                        })}
                    </div>
                </div>
                {/*  */}
                <button onClick={(e)=>clickSubmit(e)} className="btn btn-raised btn-primary mx-2">Submit</button>
            </form>
        </div>
        </>
    )
}

export default ScheduleAppointment;