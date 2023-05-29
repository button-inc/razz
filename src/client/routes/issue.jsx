import { useLoaderData } from "react-router-dom";

export function loader({ params }) {
  console.log(params);
  return fetch(
    `/github/issue?owner=${params.owner}&repo=${params.repo}&issue_number=${params.issue}`
  );
}

export default function Issue() {
  const issue = useLoaderData();

  const getIssue = () => {
    return (
      <div>
        {issue.title}
        {issue.body}
      </div>
    );
  };

  // issue.number
  // issue.title
  // issue.body
  // issue.url
  // issue.state "open"
  // issue.milestone
  // issue.labels []

  return (
    <>
      <div id="contact">
        <div>
          <h1>Issue</h1>
          <div>{getIssue()}</div>
        </div>
      </div>
    </>
  );
}
