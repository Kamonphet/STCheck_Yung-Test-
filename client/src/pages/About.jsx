import React from "react";
import checklist from "../assets/checklist.jpg"

const About=()=>{
    return(
        <div className="section" id="about">
            <h1 className="text-4xl font-bold text-center text-blue-400">About</h1><br />
            <div className="grid md:grid-cols-2 gap-8 place-items-center">
                <div>
                <img src={checklist} alt="" className="p-4" />
                </div>
                <div>
                <div className="font-bold sm:text-[1.875rem] text-2xl mb-10">
                    We will make {" "} <br />
                    <span className="text-amber-300">It's more than just checking names.</span>
                </div>
                <p className="text-md text-gray leading-7 mb-4 indent-8 text-justify">
                    Student attendance is key to successful learning. It tells us how many students are present, whether they're coming to class, and if they're ready to learn. But in many schools, attendance is just used to count heads. This can lead to a number of problems.
                </p>
                <p className="text-md text-gray leading-7 mb-4 indent-8 text-justify">
                    <b>StCheck Yung</b> is a web app that helps address these problems. It uses attendance data to help teachers prepare for activities, assess student readiness, and communicate with parents in a systematic wa
                </p>
                </div>
            </div>
        </div>
    )
}

export default About;