
import {createBrowserRouter, RouterProvider, Route, Link} from "react-router-dom"
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import Singleroom from "./pages/Singleroom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";

const router = createBrowserRouter([
  {
      path: "/",
      element: <Home/>
  },
  {
    path: "/Dashboard",
    element: <Dashboard/>
  },
  {
    path: "/room/:slug",
    element: <Singleroom/>
  },
  {
    path: "/Login",
    element: <Login/>
  },
  {
    path: "/Register",
    element: <Register/>
  },
  {
      path:"*",
      element: <ErrorPage/>
  }
])

const currentUser = async(authtoken) =>
await axios.post(`http://localhost:5000/api/currentUser`,{},{
  headers:{
    authtoken
  }
})

function App() {

  // const idToken = localStorage.getItem('token')
  // currentUser(idToken).then(response=>{
  //   console.log(response)
  //   // dispatch(
  //   //   Login({
  //   //     name: response.data.fname + " " + response.data.lname,
  //   //     email: response.data.email,
  //   //     userID: response.data._id,
  //   //     role: response.data.role,
  //   //     token : idToken
  //   //   })
  //   // )
  // }).catch(err=>{
  //   console.log(err)
  // })

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App;
