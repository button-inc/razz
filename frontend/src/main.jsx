import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './error-page'
import Dashboard, {loader as dashboardLoader} from './routes/dashboard'
import Plan, {loader as planLoader} from './routes/plan'
import HomePage from './routes/homepage'

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
    path: "plan/:owner/:repo/:token",
    element: <Plan />,
    loader: planLoader
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
