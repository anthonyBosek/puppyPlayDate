import App from "./App";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import ViewAll from "./pages/ViewAll";
import News from "./pages/News";
import PlayEvents from "./pages/PlayEvents";
import ViewOne from "./pages/ViewOne";
import Matches from "./pages/Matches";
import Login from "./pages/Login";
import Matteo from "./pages/Matteo";

const routes = [
  {
    path: "/matteo",
    element: <Matteo />
  },
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
        path: "/profile/edit",
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
        element: <PlayEvents />,
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
        element: <Login />,
      }
    ],
  },
];

export default routes;
