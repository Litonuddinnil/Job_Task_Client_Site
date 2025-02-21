import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Home/Home";
import Login from "../AuthRelated/Login/Login";
import Register from "../AuthRelated/Register/Register";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:
      [
        {
            path:"/",
            element:<Home></Home>
        }
      ]
    },
    {
        path:"/login",
        element:<Login></Login>
    },
    {
        path:"/register",
        element:<Register></Register>
    }
  ]);
 export default router; 
   
 