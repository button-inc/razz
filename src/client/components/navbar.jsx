import { Link } from "react-router-dom";

export default function Navbar({ children }) {
  return (
    <>
      <nav className="navigation">
        <Link className="brand" to={"/"}>
          razz.vote
        </Link>
      </nav>
      <main>{children}</main>
    </>
  );
}
