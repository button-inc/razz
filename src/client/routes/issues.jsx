import { useLoaderData, Link, Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

export function loader({ params }) {
  return fetch(`/github/issues?owner=${params.owner}&repo=${params.repo}`);
}

export default function Issues() {
  const issues = useLoaderData();

  const listIssues = () => {
    const issuesList = [];

    if (issues.length < 1) {return null};

    issues.forEach((issue, index) => {
      issuesList.push(
        <li key={index}>
          <Link to={`issue/${issue.number}`}>
            {issue.number} {issue.title}
          </Link>
        </li>
      );
    });
    return issuesList;
  };

  return (
    <>
      <Navbar />
      <div id="sidebar">
        <h1>GitHub Issues</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </form>
        </div>
        <nav>
          <ul>
            {listIssues()}
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>

    </>
  );
}
