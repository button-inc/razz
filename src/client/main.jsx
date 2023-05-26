import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import Dashboard, {loader as dashboardLoader} from "./routes/dashboard";
import HomePage from "./routes/homepage";
import Repos, {loader as reposLoader } from "./components/repos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "dashboard/",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    loader: dashboardLoader,
    children: [
      {
        path: "dashboard/repos/",
        element: <Repos />,
        loader: reposLoader,
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
