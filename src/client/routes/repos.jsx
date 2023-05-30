import { useLoaderData, Link } from "react-router-dom";
import Navbar from "../components/navbar";

import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export function loader() {
  return fetch("/github/repo");
}

export default function Repos() {
  const repos = useLoaderData();

  const [selectedRepo, setSelectedRepo] = useState();

  const listRepos = () => {
    const reposList = [];
    if (repos.length < 1) {
      return <div></div>;
    }

    repos.forEach((repo, index) => {
      reposList.push(
        <FormControlLabel
          key={index}
          value={repo}
          control={<Radio />}
          label={repo}
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
      <Navbar />
      <div className="centerpage">
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">
            Select repo to import
          </FormLabel>
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
      {/* TODO: disabled until a repo is selected */}
      <div className="centerpage">
        <Link className="link-button" to={`/vote/${selectedRepo}`}>
          {" "}
          Import{" "}
        </Link>
      </div>
    </>
  );
}
