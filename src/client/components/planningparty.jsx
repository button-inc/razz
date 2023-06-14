import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import RoomInfo from "./roominfo";
import VoteInfo from "./voteinfo";

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
//TODO: move to index.css
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
  const [party, setParty] = useState([]); // party room vote data
  const [vote, setVote] = useState(); // this user vote selection
  const [final, setFinal] = useState();
  const [open, setOpen] = useState(false);
  const [voteSubmitted, setVoteSubmitted] = useState(false);

  // when joining the party first time, submit name to the session
  useEffect(() => {
    fetch(`/room`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: name }),
    });
  }, []);

  useEffect(() => {
    const source = new EventSource(`/party?repo=${reponame}`);

    source.addEventListener("open", () => {
      console.log("SSE opened!");
    });

    source.addEventListener("party", (e) => {
      console.log(e.data);
      const data = JSON.parse(e.data);

      setParty(data);
    });

    source.addEventListener("error", (e) => {
      console.error("Error: ", e);
    });

    // clean up function runs on unmount
    return () => {
      source.close();
    };
  }, []);

  // submit personal vote to the session
  const handleVote = async () => {
    await fetch(`/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: name, vote: `${vote}` }),
    });
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
    await fetch(`/github/label`, {
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

    handleClose();
    setVoteSubmitted(true);
  };

  return (
    <div className="party-container">
      <div className="party-room-info-container">
        <RoomInfo party={party} />
      </div>
      <div className="party-main-container">
        {/* User voting options */}
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
        <div className="centerpage">
          <Button
          className="m-button"
            disabled={!vote || voteSubmitted}
            onClick={() => {
              handleVote();
            }}
          >
            {" "}
            Submit Vote{" "}
          </Button>
        </div>
        {/* Submit final vote to github */}
        <>
          <div className="centerpage">
            <Button className="m-button" onClick={handleOpen}>Submit Final Vote to GitHub</Button>
          </div>
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
              <Button className="m-button" onClick={() => handleSubmit()}>Submit</Button>
            </Box>
          </Modal>
        </>
        {voteSubmitted && (
          <div>
            Submitted final vote {final} to issue {issuenumber}{" "}
          </div>
        )}
      </div>
      <div className="party-vote-info-container">
        <VoteInfo party={party} />
      </div>
    </div>
  );
}
