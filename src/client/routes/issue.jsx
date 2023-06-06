import { useLoaderData, useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";
import PlanningParty from "../components/planningparty";

const URL = import.meta.env.BASE_URL + "submitvote/";

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

  const pathname = useLocation().pathname.split("/");
  const reponame = pathname[2] + "/" + pathname[3];
  const issuenumber = pathname[5];

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

  const handleSubmit = async () => {
    // if a vote is selected, submit request to backend

    const body = {
      vote: vote,
      repo: reponame,
      issue_number: issuenumber,
    };

    const resp = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // redirect
  };

  return (
    <>
      <h2>{reponame}</h2>

      <PlanningParty />
      <div>{getIssue()}</div>
      <FormControl>
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
        <Button
          onClick={() => {
            handleSubmit();
          }}
        >
          {" "}
          Submit Vote{" "}
        </Button>
      </div>
    </>
  );
}
