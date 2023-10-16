import App from "./App";
import HomePage from "./pages/HomePage";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import ViewAll from "./pages/ViewAll";
import ViewOne from "./pages/ViewOne";
import ErrorPage from "./pages/ErrorPage";
import Profile from "./pages/Profile";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/add",
        element: <Add />,
      },
      {
        path: "/edit/:id",
        element: <Edit />,
      },
      {
        path: "/dogs",
        element: <ViewAll />,
      },
      {
        path: "/dogs/:id",
        element: <ViewOne />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
    ],
  },
];

export default routes;
