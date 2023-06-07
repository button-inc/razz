import { Link } from "react-router-dom";

import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export default function ReposList({ repos }) {
  const [selectedRepo, setSelectedRepo] = useState();

  const listRepos = () => {
    const reposList = [];

    if (!repos || repos.length < 1) {
      return;
    }

    repos.forEach((repo, index) => {
      reposList.push(
        <FormControlLabel
          key={index}
          value={repo.full_name}
          control={<Radio />}
          label={repo.full_name}
        />
      );
    });
    return reposList;
  };

  const handleChange = (event) => {
    setSelectedRepo(event.target.value);
  };

  return (
    <>
      <div className="centerpage">
        <div className="login">
          <h2>Select a repo to import</h2>
          <div className="centerpage">
            {/* TODO: disabled until a repo is selected */}
            <Link className="link-button" to={`/vote/${selectedRepo}`}>
              {" "}
              Import{" "}
            </Link>
          </div>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={selectedRepo}
              onChange={handleChange}
            >
              {listRepos()}
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    </>
  );
}
