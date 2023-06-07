import Navbar from "../components/navbar";

import React, { useEffect, useState } from "react";
import ReposList from "../components/reposlist";

function Repos() {
  const [repos, setRepos] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllPages();
  }, []);

  async function fetchAllPages() {
    const repos = [];
    let i = 0;

    do {
      const response = await fetch(`/github/repo?page=${i}`);
      const data = await response.json();
      repos.push(...data);
      i = i + 1;
    } while (repos.length % 30 === 0);

    setRepos(repos);
    setIsLoading(false);
  }

  return (
    <>
      <Navbar />
      <div className="centerpage">
        <div className="login">
          {!isLoading && (
            <>
              <ReposList repos={repos} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default React.memo(Repos);
