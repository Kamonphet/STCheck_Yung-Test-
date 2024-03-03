import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";
import Swal from "sweetalert2";
import wallpaper from "../assets/wallpaper.jpg";

const Register = () => {

  const [state, setState] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const { fname, lname, email, password } = state;

  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const SubmitForm = (e) => {
    e.preventDefault();
    // console.table({ user, password });
    axios.post(`http://localhost:5000/api/register`,{fname, lname, email, password})
    .then(response=>{
      Swal.fire("Great!", "Your user has been register successfully", "success");
      setTimeout(() => {
        window.location.href = "/Login";
      }, 1000);
    }).catch(err=>{
      Swal.fire('แจ้งเตือน',err.response.data.msg,'error')
    })
  };



  return (
    <div style={{ backgroundImage: `url(${wallpaper})` }}>
      <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
        <div
          className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
          style={{ maxWidth: "1000px" }}
        >
          <div className="md:flex w-full bg-white">
            <div className=" md:block w-1/2 bg-indigo-500">
              <img src="https://source.unsplash.com/random?wallpapers" className="h-full"/>
            </div>
            <div className="md:w-1/2 py-5 md:px-10">
              <img src={logo} alt="" className="w-1/2 ml-28" />
              <div className="text-center mb-10">
                <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
                <p>Enter your information to register</p>
              </div>
              <form onSubmit={SubmitForm}>
                <div className="flex -mx-3">
                  <div className="w-1/2 px-3 mb-5">
                    <label className="text-xs font-semibold px-1">
                      First name
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="text"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="John"
                        value={fname}
                        onChange={inputValue("fname")}
                      />
                    </div>
                  </div>
                  <div className="w-1/2 px-3 mb-5">
                    <label className="text-xs font-semibold px-1">
                      Last name
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="text"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="Smith"
                        value={lname}
                        onChange={inputValue("lname")}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label  className="text-xs font-semibold px-1">
                      Email
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="email"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="johnsmith@example.com"
                        value={email}
                        onChange={inputValue("email")}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-12">
                    <label  className="text-xs font-semibold px-1">
                      Password
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="password"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="************"
                        value={password}
                        onChange={inputValue("password")}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex mx-3">
                  <div className="w-full px-3 mb-5 ml-4 space-x-4">
                    <input type="submit" className=" w-40 max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 text-white rounded-lg px-3 py-3 mb-3" value="Register"/>
                    <Link to={`/`}>
                      <button className=" w-40 max-w-xs mx-auto bg-red-500 hover:bg-red-700  text-white rounded-lg px-3 py-3">
                        Cancel
                      </button>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
