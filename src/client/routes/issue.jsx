import { useLoaderData } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";
import ReactMarkdown from "react-markdown";

export function loader({ params }) {
  return fetch(
    `/github/issue?owner=${params.owner}&repo=${params.repo}&issue_number=${params.issue}`
  );
}

export default function Issue() {
  const issue = useLoaderData();

  const getIssue = () => {
    console.log(issue);
    return (
      <>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              <a href={issue.url}># {issue.number}</a>
            </Typography>
            <Typography variant="h5" component="div">
              {issue.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {issue.user.login}
            </Typography>
            <Typography variant="body2">
              <ReactMarkdown>{issue.body}</ReactMarkdown>
            </Typography>
          </CardContent>
        </Card>
      </>
    );
  };

  return (
    <>
      <h2>Repository name</h2>
      <div>{getIssue()}</div>
    </>
  );
}
