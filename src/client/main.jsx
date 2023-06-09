import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import User, { loader as userLoader } from "./routes/user";
import HomePage from "./routes/homepage";
import Repos, { loader as reposLoader } from "./routes/repos";
import Issues, { loader as issuesLoader } from "./routes/issues";
import Issue, { loader as issueLoader } from "./routes/issue";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "user/",
    element: <User />,
    errorElement: <ErrorPage />,
    loader: userLoader,
  },
  {
    path: "repos/",
    element: <Repos />,
    errorElement: <ErrorPage />,
    loader: reposLoader,
  },
  {
    path: "vote/:owner/:repo",
    element: <Issues />,
    errorElement: <ErrorPage />,
    loader: issuesLoader,
    children: [
      {
        path: "issue/:issue",
        element: <Issue />,
        errorElement: <ErrorPage />,
        loader: issueLoader,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
