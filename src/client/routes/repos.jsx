import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export default function Repos() {
  const [page, setPage] = useState(0);
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState();

  useEffect(() => {
    let abortController = new AbortController();
    let { signal } = abortController;
    fetch(`/github/repo?page=${page}`, {
      signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setRepos((prev) => [...prev, ...data]);
        if (data.length < 100) {

          // todo: set loading state false

          return () => {
            abortController.abort();
          };
        }
        setPage(page + 1);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          setRepos([]);
        }
      });
  }, [page]);

  const listRepos = () => {
    const reposList = [];
    if (repos.length < 1) {
      return <div></div>;
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
      <Navbar />
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
