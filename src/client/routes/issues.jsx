import { useLoaderData, Link, Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export async function loader({ params }) {
  const issues = [];
  let i = 0;

  do {
    const response = await fetch(
      `/github/issues?owner=${params.owner}&repo=${params.repo}&page=${i}`
    );
    const data = await response.json();
    issues.push(...data);
    i = i + 1;

    if (data.length < 30) {
      break;
    }
  } while (1);

  return issues;
}

export default function Issues() {
  const issues = useLoaderData();
  const [search, setSearch] = useState("");

  const listIssues = (search) => {
    if (issues.length < 1) {
      return null;
    }

    let issuesList = issues.map((issue) => {
      const titleString = issue.title.toString();
      const numberString = issue.number.toString();

      // if the query is undefined or empty string, return the element
      if (search === undefined || search === "") {
        return (
          <li key={issue.number}>
            <Link to={`issue/${issue.number}`}>
              {issue.number} {issue.title}
            </Link>
          </li>
        );
      }
      // else if only return the item if contains the query
      else if (titleString.includes(search) || numberString.includes(search)) {
        return (
          <li key={issue.number}>
            <Link to={`issue/${issue.number}`}>
              {issue.number} {issue.title}
            </Link>
          </li>
        );
      }
    });
    return issuesList;
  };

  return (
    <>
      <Navbar>
        <div className="container">
          <div id="sidebar">
            <h1>GitHub Issues</h1>
            <TextField
              id="outlined-controlled"
              label="Search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
            <nav>
              <ul>{listIssues(search)}</ul>
            </nav>
          </div>
          <div id="detail">
            <Outlet />
          </div>
        </div>
      </Navbar>
    </>
  );
}
