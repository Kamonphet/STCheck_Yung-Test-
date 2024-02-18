
import {createBrowserRouter, RouterProvider, Route, Link} from "react-router-dom"
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import Singleroom from "./pages/Singleroom";

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
