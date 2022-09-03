import React from "react";
import Typewriter from 'typewriter-effect';

const LandingPage=()=>{
    return(
        <div className="jumbotron m-3 mt-5">
                <h1 className="display-4">
                    {<Typewriter
                    options={{
                        autoStart: true,
                        loop: true,
                      }}
                    onInit={(typewriter) => {
                        typewriter.typeString('Wanna Schedule an Appointment!?!?')
                            .callFunction(() => {
                                // console.log('String typed out!');
                            })
                            .pauseFor(1000)
                            // .deleteAll()
                            // .callFunction(() => {
                            //     // console.log('All strings were deleted');
                            // })
                            .start()
                            .deleteAll()
                            }
                        }
                />}
                </h1>
                <p className="lead">Signup/Login to create an appointment or to see your current appointments.</p>
                <hr className="my-4"/>
                <p>You can also mark for your off hours to avoid any appointments in those slots.</p>
                {/* <p className="lead">
                    <button className="btn btn-success text-white" onClick={goToUserPlayground}>Let's Find Out!</button>
                </p> */}
            </div>
    )
}

export default LandingPage;