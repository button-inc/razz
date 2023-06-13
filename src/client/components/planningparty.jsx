import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PlanningParty({ name, reponame, issuenumber }) {
  const [party, setParty] = useState({}); // party room vote data
  const [vote, setVote] = useState(); // this user vote selection
  const [room, setRoom] = useState(); // users in the room
  const [final, setFinal] = useState();
  const [open, setOpen] = useState(false);
  const [voteSubmitted, setVoteSubmitted] = useState(false);

  console.log(room);

  useEffect(() => {
    fetch(`/room`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: name }),
    });
  }, [name]);

  useEffect(() => {
    const source = new EventSource(`/party?repo=${reponame}`);

    source.addEventListener("open", () => {
      console.log("SSE opened!");
    });

    source.addEventListener("votes", (e) => {
      console.log(e.data);
      const data = JSON.parse(e.data);

      setParty(data);
    });

    source.addEventListener("room", (e) => {
      console.log(e.data);
      const data = JSON.parse(e.data);
      setRoom(data);
    });

    source.addEventListener("error", (e) => {
      console.error("Error: ", e);
    });

    // clean up function runs on unmount
    // example to close the connection just go to a new page?
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

  const handleFinalChange = (event) => {
    setFinal(event.target.value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    // close sse connection first?
    await fetch(`/submitvote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vote: `${final}`,
        repo: `${reponame}`,
        issuenumber: `${issuenumber}`,
      }),
    });

    // close the modal
    handleClose();
    // display the final vote and disable more voting
    setVoteSubmitted(true);
  };

  return (
    <div>
      <div>votes</div>
      <ul>{getUserVotes()}</ul>
      {/* User voting options */}
      {/* disable votes once selected */}
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
      {/* User vote submit */}
      {/* TODO: disabled until a vote is selected */}
      <div className="centerpage">
        <Button
          disabled={voteSubmitted}
          onClick={() => {
            handleClick();
          }}
        >
          {" "}
          Submit Vote{" "}
        </Button>
      </div>
      {/* Submit final vote to github */}
      <>
        <Button onClick={handleOpen}>Submit Final Vote to GitHub</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Final Vote
            </Typography>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={final}
                onChange={handleFinalChange}
              >
                {getVotingButtons()}
              </RadioGroup>
            </FormControl>
            <Button onClick={() => handleSubmit()}>Submit</Button>
          </Box>
        </Modal>
      </>
      {voteSubmitted && (
        <div>
          Submitted final vote {final} to issue {issuenumber}{" "}
        </div>
      )}
    </div>
  );
}
