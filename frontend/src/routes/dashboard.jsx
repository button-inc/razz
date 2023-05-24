import { useMemo, useState } from "react";
import { Outlet, Link, useLoaderData } from "react-router-dom";

// exchange GitHub redirect code for user access token
export function loader ({ request }) {
    const url = new URL(request.url);
    const code = url.searchParams.get('code')
    return fetch(`http://localhost:3001/api/github/${code}`);
}

export default function Dashboard() {
    const [token, setToken] = useState(useLoaderData());
    const [repos, setRepos] = useState([])
    const [issues, setIssues] = useState([])

    async function getUserRepos () {
        // Lists repositories that the authenticated user has explicit permission (:read, :write, or :admin) to access.
        const response = await fetch("https://api.github.com/user/repos?affiliation=collaborator&sort=updated", {
            method: "GET",
            headers: {
                "Accept": "application/vnd.github+json",
                "Authorization": `Bearer ${token.token}`,
                "X-GitHub-Api-Version": "2022-11-28",
            },
        })

        const data = await response.json();
        const repos = data.map((item) => item.full_name) // item.full_name == OWNER/REPO
        setRepos(repos)
    }

    if (token.token && !repos.length) {
        getUserRepos()
    }

    // TODO: selecting a repo creates a session for estimation??
    // TODO: creates a permanent link for authenticated users to join?
    // List issues in a repository. Only open issues will be listed.
    // https://api.github.com/repos/OWNER/REPO/issues
    // OWNER The account owner of the repository. The name is not case sensitive.
    // REPO The name of the repository. The name is not case sensitive.
    async function getRepoIssues (repo) {
        // Lists repositories that the authenticated user has explicit permission (:read, :write, or :admin) to access.
        const response = await fetch(`https://api.github.com/repos/${repo}/issues`, {
            method: "GET",
            headers: {
                "Accept": "application/vnd.github+json",
                "Authorization": `Bearer ${token.token}`,
                "X-GitHub-Api-Version": "2022-11-28",
            }
        })
        const data = await response.json()
        console.log(data)
        const issues = data.map((item) => {
            const container = {};

            container.title = item.title;
            container.number = item.number;
            container.url = item.url;

            return container;
        })
        setIssues(issues)
    }

    function handleOnRepoClick (repo) {
        console.log('handle repo click', repo)
        getRepoIssues(repo)
    }

    return (
      <>
        {/* <div id="sidebar">
            <h1>React Router Contacts</h1>
            <div>
            <form id="search-form" role="search">
                <input
                    id="q"
                    aria-label="Search contacts"
                    placeholder="Search"
                    type="search"
                    name="q"
                />
                <div
                    id="search-spinner"
                    aria-hidden
                    hidden={true}
                />
                <div
                    className="sr-only"
                    aria-live="polite"
                ></div>
            </form>
            <form method="post">
                <button type="submit">New</button>
            </form>
            </div>
        </div> */}
        <div id="detail">
            Dashboard
            {/* <ReposList items={repos}  /> */}
            {repos.map((item) => <li key={item} onClick={() => handleOnRepoClick(item)}>{item}</li>)}
        </div>
        {issues.length &&
            <div id="detail">
                {issues.map((item) => <li key={item.number}>{item.title}</li>)}
            </div>
        }
      </>
    );
}





