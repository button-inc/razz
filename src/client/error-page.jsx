import { Link, useRouteError } from "react-router-dom";
import Navbar from "./components/navbar";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <Navbar />
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <Link to={"/"} >Take me home</Link>
      </div>
    </>
  );
}
