import Login from "../components/login";
import Navbar from "../components/navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div id="homepage">
        <div>
          <h1>razz.vote</h1>
          <h2>consensus-based estimation for your GitHub issues</h2>
          <div className="login">
            <Login />
          </div>
        </div>
      </div>
    </>
  );
}
