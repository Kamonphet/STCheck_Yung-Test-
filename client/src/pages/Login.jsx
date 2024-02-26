import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Login = () => {
  const [state, setState] = useState({
    user: "",
    password: "",
  });

  const { user, password } = state;
  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const SubmitForm = (e) => {
    e.preventDefault();
    console.table({ user, password });
  };

  return (
    <div className="font-Poppins">
      <div class="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
        <div
          class="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
          style={{ maxWidth: "1000px" }}
        >
          <div class="md:flex w-full">
            <div class="hidden md:block w-1/2 bg-indigo-500 py-10 px-10"></div>
            <div class="md:w-1/2 py-10 px-5 md:px-10">
              <img src={logo} alt="" className="w-1/2 ml-28" />
              <div class="text-center">
                <h1 class="font-bold text-3xl text-gray-900">Login</h1>
                <p>Enter your information to register</p>
              </div>
              <div>
                {JSON.stringify(state)}
                <form onSubmit={SubmitForm}>
                    <div class="flex -mx-3">
                        <div class="w-full px-3 mb-5">
                            <label for="" class="text-xs font-semibold px-1">
                                Email
                            </label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                <i class="mdi mdi-email-outline text-gray-400 text-lg"></i>
                                </div>
                                <input
                                type="email"
                                class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                                placeholder="johnsmith@example.com"
                                value={user}
                                onChange={inputValue("user")}
                                />
                            </div>
                        </div>
                    </div>
                  <div class="flex -mx-3">
                    <div class="w-full px-3 mb-12">
                      <label for="" class="text-xs font-semibold px-1">
                        Password
                      </label>
                      <div class="flex">
                        <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i class="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          type="password"
                          class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="************"
                          value={password}
                          onChange={inputValue("password")}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex mx-3">
                    <div class="w-full px-3 mb-5 ml-4 space-x-4">
                      <button class=" w-40 max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 text-white rounded-lg px-3 py-3 mb-3">
                        Log in
                      </button>
                      <Link to={`/`}>
                        <button class=" w-40 max-w-xs mx-auto bg-red-500 hover:bg-red-700  text-white rounded-lg px-3 py-3">
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
    </div>
  );
};

export default Login;
