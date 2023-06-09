import { createBrowserRouter } from "react-router-dom";
import Layouts from "../pages/Layouts/Layouts";
import Login from "../pages/Login/login";
import Register from "../pages/Register/register";
import Home from "../pages/Home/Home";
import Payment from "../pages/Payment/Payment";
import Profile from "../pages/Settings/Profile/Profile";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts />,
    errorElement: <Layouts />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: 'profile',
        element: <Profile/>
      }
    ],

  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);

export default router;
