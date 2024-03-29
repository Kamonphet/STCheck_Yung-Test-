
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import Singleroom from "./pages/Singleroom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChknTable from "./pages/ChknTable";
import RandomName from "./pages/randomName";
import Report from "./pages/Report";

const router = createBrowserRouter([
  {
      path: "/",
      element: <Home/>
  },
  {
    path: "/dashboard",
    element: <Dashboard/>
  },
  {
    path: "/room/:slug",
    element: <Singleroom/>
  },
  {
    path: "/checkname/:slug",
    element: <ChknTable/>
  },
  {
    path: "/randomName/:slug",
    element: <RandomName/>
  },
  {
    path: "/report",
    element: <Report/>
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

function App() {

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App;
