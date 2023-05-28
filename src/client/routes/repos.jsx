import { useLoaderData, Link } from "react-router-dom";
import Navbar from "../components/navbar";

export function loader() {
  return fetch("/github/repo");
}

export default function Repos() {
  const repos = useLoaderData();

  const listRepos = () => {
    const reposList = [];
    if (repos.length < 1) {
      return <div>''</div>;
    }

    repos.forEach((repo, index) => {
      reposList.push(
        <li key={index}>
          <Link to={`/vote/${repo}`}>{repo}</Link>
        </li>
      );
    });
    return reposList;
  };

  return (
    <>
      <Navbar />
      <div className="centerpage">
        <div>
          <h1>GitHub Repositories</h1>
          <ul>{listRepos()}</ul>
        </div>
      </div>
    </>
  );
}
