import Navbar from "../components/navbar";
import { useLoaderData, Link, Outlet } from "react-router-dom";

export function loader () {
  return fetch("/github/user");
}

export default function Dashboard() {
  const user = useLoaderData();

  return (
    <>
      <Navbar />
      <div className="centerpage">
        <div>
          <h1> Dashboard </h1>
          {user?.name &&
            <h2>{`Welcome ${user.name}`}</h2>
          }
          <div className="login">
            <Link className="login-button" to={"dashboard/repos"}> My GitHub Repositories </Link>
          </div>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
