import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";

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

export default function PlanningParty({ name, reponame, issuenumber }) {
  const [party, setParty] = useState({});
  const [vote, setVote] = useState();

  useEffect(() => {
    const source = new EventSource(`/party`);

    source.addEventListener("open", () => {
      console.log("SSE opened!");
    });

    source.addEventListener("message", (e) => {
      console.log(e.data);
      const data = JSON.parse(e.data);

      setParty(data);
    });

    source.addEventListener("error", (e) => {
      console.error("Error: ", e);
    });

    return () => {
      source.close();
    };
  }, []);

  // TODO: send user name with empty vote so you can see who is in the party

  const handleClick = async () => {
    await fetch(`/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: name, vote: `${vote}` }),
    });
  };

  const getUserVotes = () => {
    const userVotes = [];

    Object.entries(party).forEach(([key, value]) => {
      userVotes.push(
        <li>
          {key} : {value}
        </li>
      );
    });
    return userVotes;
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
    // close sse connection first?
    await fetch(`/submitvote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vote: `${vote}`,
        repo: `${reponame}`,
        issuenumber: `${issuenumber}`,
      }),
    });
  };

  return (
    <div>
      <div>votes</div>
      <ul>{getUserVotes()}</ul>
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
      {/* TODO: disabled until a vote is selected */}
      <div className="centerpage">
        <Button
          onClick={() => {
            handleClick();
          }}
        >
          {" "}
          Submit Vote{" "}
        </Button>
      </div>

      <div className="centerpage">
        <Button
          onClick={() => {
            handleSubmit();
          }}
        >
          {" "}
          Submit Final Vote to GitHub{" "}
        </Button>
      </div>
    </div>
  );
}
