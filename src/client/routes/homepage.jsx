import Login from "../components/login";
import Navbar from "../components/navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="centerpage">
        <div>
          <h2>Consensus-based estimation for your GitHub issues</h2>
          <div className="login">
            <Login />
          </div>
        </div>
      </div>
    </>
  );
}
