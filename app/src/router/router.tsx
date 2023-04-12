import { createBrowserRouter } from 'react-router-dom';
import Layouts from '../pages/Layouts/Layouts';
import Login from '../pages/Login/login';
import Register from '../pages/Register/register';
import Home from '../pages/Home/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layouts />,
    errorElement: <Layouts />,
    children: [
      {
        path: '/',
        element: <Home/>
    },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/register',
        element: <Register/>
      }
    ]
  }
]);

export default router;