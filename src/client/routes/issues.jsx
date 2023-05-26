import { useLoaderData, Link } from "react-router-dom";
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
          <div>
            {issue.number} {issue.title}
          </div>
          <p>{index.body}</p>
        </li>
      );
      // issue.number
      // issue.title
      // issue.body
      // issue.url
      // issue.state "open"
      // issue.milestone
      // issue.labels []
    });
    return issuesList;
  };

  return (
    <>
      <Navbar />
      <div className="centerpage">
        <div>
          <h1>GitHub Issues</h1>
          <ul>{listIssues()}</ul>
        </div>
      </div>
    </>
  );
}
