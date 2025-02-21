import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Home/Home";
import Login from "../AuthRelated/Login/Login";
import Register from "../AuthRelated/Register/Register";
import TaskManageMent from "../Pages/TaskManageMent/TaskManageMent";
import AddTasks from "../Pages/AddTasks/AddTasks"; 
import AllTasks from "../Pages/AllTasks/AllTasks";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:
      [
        {
            path:"/",
            element:<Home></Home>
        },
        {
          path:"/addTasks",
          element:<AddTasks></AddTasks>
        },
        {
          path:"/taskManage",
          element:<TaskManageMent></TaskManageMent>
        }, 
        {
          path:"/tasks",
          element:<AllTasks></AllTasks>
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
   
 