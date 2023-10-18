import App from "./App";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import ViewAll from "./pages/ViewAll";
import News from "./pages/News";
import Events from "./pages/Events";
import ViewOne from "./pages/ViewOne";
import Matches from "./pages/Matches";
import Login from "./pages/Login";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        index: true,
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
        path: "/news",
        element: <News />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/dogs/:id",
        element: <ViewOne />,
      },
      {
        path: "/profile/",
        element: <ViewOne />,
      },
      {
        path: "/matches",
        element: <Matches />,
      },
      {
        path: "/login",
        element: <Login />
      }
    ],
  },
];

export default routes;
