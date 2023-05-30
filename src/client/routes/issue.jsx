import { useLoaderData } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button } from "@mui/material";

const URL = import.meta.env.BASE_URL + "submitvote";

const votingOptions = [
    "0",
    "1",
    "3",
    "5",
    "8",
    "13",
    "21",
    "34",
    "?",
    "coffee",
];

export function loader({ params }) {
  return fetch(
    `/github/issue?owner=${params.owner}&repo=${params.repo}&issue_number=${params.issue}`
  );
}

export default function Issue() {
  const issue = useLoaderData();
  const [vote, setVote] = useState();

  const getIssue = () => {
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

  const getVotingButtons = () => {
      const votingButtons = [];

      {
        votingOptions.forEach((value, index) => {
          votingButtons.push(
            <FormControlLabel
              key={index}
              value={value}
              control={<Radio />}
              label={value}
            />
          );
        });
      }
      return votingButtons;
  };

  const handleChange = (event) => {
    setVote(event.target.value);
  };

  return (
    <>
      <h2>Repository name</h2>
      <div>{getIssue()}</div>
      <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">
            Select repo to import
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={vote}
            onChange={handleChange}
          >
            {getVotingButtons()}
          </RadioGroup>
        </FormControl>
        {/* TODO: disabled until a repo is selected */}
      <div className="centerpage">
        <Button>
        {" "}
          Submit Vote{" "}
        </Button>
      </div>
    </>
  );
}
