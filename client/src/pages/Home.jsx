import React, {useState, useEffect } from "react";
import About from "./About";
import Service from "./Service";
import Contract from "./Contract";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import checklist2 from "../assets/checklist2.gif"
import ScrollButton from "../component/ScrollButton";
import 'animate.css';
import TrackVisibility from 'react-on-screen'


// create ไฟล์ แต่ละหน้าเร็ว ๆ
// rfce

const Home=()=>{
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const toRotate = [`We're Teacher❤️`, `This web for checkname😊`, `Let's do it !!!`];
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(200 - Math.random()*100)
    const period = 2000;

    // generate word
    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        },delta)

        return () => {clearInterval(ticker)}
    }, [text])

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let UpdatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length +1);

        setText(UpdatedText)

        if(isDeleting){
            setDelta(prevdelta => prevdelta /2)
        }

        if(!isDeleting && UpdatedText === fullText) {
            setIsDeleting(true);
            setDelta(period)
        }else if (isDeleting && UpdatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum+1);
            setDelta(100)
        }
    }
    return(
        <div className="section h-screen" id="home">
            <Navbar/>
            <div className="container font-Poppins">
                <ScrollButton/>
                <div className="md:flex items-center justify-center">
                    <div>
                        <div className="sm:text-[2.5rem] text-[2rem] font-bold">
                            <TrackVisibility>
                            {({isVisible}) =>
                            <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                            <h1>{` Welcome to STCheck yung `}<br/>
                            <span className="text-wrap text-amber-300">{text}</span></h1>
                            </div>}
                            </TrackVisibility>
                            {/* This is <br /> the new way <br /> to learn online */}
                        </div>
                        <p className="text-sm leading-7 text-gray max-w-sm">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero
                            officia sit vitae quo, eum similique?
                        </p>
                        <div className="mt-6">
                            <a href="/Login" className="px-6 py-3 font-bold text-white bg-blue-400 rounded-lg mr-4 text-sm">
                            Get Started
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center justify-center flex-wrap ml-20 p-2">
                        <img src={checklist2} alt="" className="w-full"/>
                    </div>
                </div>
                <About/>
                <Service/>
                <Contract/>
            </div>
        </div>
    )
}

export default Home;