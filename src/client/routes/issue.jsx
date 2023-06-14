import { useLoaderData, useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ReactMarkdown from "react-markdown";
import PlanningParty from "../components/planningparty";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

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

export function loader({ params }) {
  return fetch(
    `/github/issue?owner=${params.owner}&repo=${params.repo}&issue_number=${params.issue}`
  );
}

export default function Issue() {
  const issue = useLoaderData();
  const [name, setName] = useState();
  const [open, setOpen] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  // clear the voting history when you render an issue
  useEffect(() => {
    fetch("/clearvote");
  }, [issue]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  return (
    <>
      <h2>{reponame}</h2>
      <div>{getIssue()}</div>
      {!isStarted && (
        <>
          <Button onClick={handleOpen}>Start planning party</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Enter your name
              </Typography>
              <TextField
                id="outlined-basic"
                className="centerpage"
                label="Enter name"
                variant="outlined"
                margin="normal"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              <Button onClick={() => setIsStarted(true)}>Start</Button>
            </Box>
          </Modal>
        </>
      )}
      {isStarted && (
        <PlanningParty
          name={name}
          reponame={reponame}
          issuenumber={issuenumber}
        />
      )}
    </>
  );
}
