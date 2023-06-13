import Navbar from "../components/navbar";
import React from "react";
import ReposList from "../components/reposlist";
import { useLoaderData } from "react-router-dom";

export async function loader() {
  const repos = [];
  let i = 0;

  do {
    const response = await fetch(`/github/repo?page=${i}`);
    const data = await response.json();
    repos.push(...data);
    i = i + 1;

    if (data.length < 30) {
      break;
    }
  } while (1);

  return repos;
}

export default function Repos() {
  const repos = useLoaderData();

  return (
    <>
      <Navbar />
      <div className="centerpage">
        <div className="login">
          <ReposList repos={repos} />
        </div>
      </div>
    </>
  );
}
