import Navbar from "../components/navbar";
import { useLoaderData, Link } from "react-router-dom";

export function loader() {
  return fetch("/github/user");
}

export default function User() {
  const user = useLoaderData();

  return (
    <>
      <Navbar />
      <div className="centerpage">
        <div className="login">
          {user?.name && (
            <p>
              <h2>{`Welcome ${user.name}`}</h2>
            </p>
          )}
          <div>
            <Link className="link-button" to={"/repos"}>
              {" "}
              Import GitHub Repositories{" "}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
