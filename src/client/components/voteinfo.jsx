import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

export default function VoteInfo({ party }) {
  const [checked, setChecked] = useState(false); // reveal votes = true

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const total = party?.length;
  let count = 0;
  party?.forEach((person) => {
    if (person.estimate) ++count;
  });

  return (
    <>
      <h2>
        {"Votes"} {count}
        {"/"}
        {total}
      </h2>
      <ul>
        {party?.map((person) => {
          if (checked) {
            return (
              <li className="list-item-party-info">
                {person.estimate} {person.name}
              </li>
            );
          } else {
            const icon = person.estimate ? (
              <CheckCircleIcon />
            ) : (
              <RadioButtonUncheckedIcon />
            );
            return (
              <li className="list-item-party-info">
                {icon} {person.name}
              </li>
            );
          }
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
