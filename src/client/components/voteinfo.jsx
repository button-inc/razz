import React, { useState } from "react";
import Switch from "@mui/material/Switch";

export default function VoteInfo({ party }) {
  const [checked, setChecked] = useState(false); // reveal votes = true

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  // display users not voted
  // show x/y voted
  // reveal votes

  return (
    <>
      <div>Votes</div>
      <ul>
        {party?.map((person) => {
          return (
            <li>
              {person.name}
              {":"}
              {person.estimate}
            </li>
          );
        })}
      </ul>
      <div>Reveal Votes</div>
      <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
    </>
  );
}
