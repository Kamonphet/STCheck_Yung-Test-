import { useState, useEffect } from "react";
import Game from "./Game";
import wallpaper6 from "../assets/wallpaper6.jpg";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import Navbar_main from "../component/Navbar_main";

const randomName = () => {
  let { slug } = useParams();
  const  navigate = useNavigate();

  // get room data
  const [singleroom, setSingleroom] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/room/${slug}`)
      .then((response) => {
        setSingleroom(response.data);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundImage: `url(${wallpaper6})`, backgroundSize: "100%" }}>
      <Navbar_main />
      <div className="pt-16 pl-12 font-Kanit">
        <div className="bg-amber-300 rounded-2xl mt-10 px-6 py-5 mx-10 my-5 max-w-md">
          <button onClick={() => navigate(-1)}  className="text-3xl font-bold">
            ห้อง {singleroom.classroom}
          </button>
          <h1 className="text-2xl mb-1">
            <span>วิชา : </span> {singleroom.subject}
          </h1>
        </div>
      </div>
      <div className="ml-64">
        <Game/>
      </div>
      
    </div>
  );
};

export default randomName;
