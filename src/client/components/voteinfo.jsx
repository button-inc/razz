import React, { useState } from "react";
import Switch from "@mui/material/Switch";

export default function VoteInfo({ party }) {
  const [checked, setChecked] = useState(false); // reveal votes = true

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const getUserVotes = () => {
    const userVotes = [];
    Object.entries(party.votes).forEach(([key, value]) => {
      // if votes = {} -> list names and not voted
      // make people array an array of tuples??

      // if checked - push the real value
      userVotes.push(
        <li>
          {key} : {value}
        </li>
      );
    });
    return userVotes;
  };

  // display users not voted
  // show x/y voted
  // reveal votes

  return (
    <>
      <div>Votes</div>
      <ul>{party?.votes && getUserVotes()}</ul>
      <div>Reveal Votes</div>
      <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
    </>
  );
}
