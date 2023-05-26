import Navbar from "../components/navbar";
import { useLoaderData, Link, Outlet } from "react-router-dom";

export function loader () {
  console.log('dashboard loader')
  return fetch("/github/user");
}

export default function Dashboard() {
  const user = useLoaderData();

  return (
    <>
      <Navbar />
      <h1> Dashboard </h1>
      {user?.name &&
        <h2>{`Welcome ${user.name}`}</h2>
      }
      <nav>
        <Link to={"dashboard/repos"}> My GitHub Repositories </Link>
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  );
}
