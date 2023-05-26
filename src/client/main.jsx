import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import Dashboard, {loader as dashboardLoader} from "./routes/dashboard";
import HomePage from "./routes/homepage";
import Repos, {loader as reposLoader } from "./routes/repos";
import Issues, {loader as issuesLoader } from "./routes/issues";

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
    loader: dashboardLoader
  },
  {
    path: "repos/",
    element: <Repos />,
    loader: reposLoader,
  },
  {
    path: "issues/:owner/:repo",
    element: <Issues />,
    loader: issuesLoader,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
