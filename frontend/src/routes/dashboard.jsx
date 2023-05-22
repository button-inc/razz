import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Octokit } from "@octokit/core"

// exchange code for OAuth token
export function loader ({ request }) {
    const url = new URL(request.url);
    const code = url.searchParams.get('code')
    return fetch(`http://localhost:3001/api/github/${code}`);
}

export default function Dashboard() {
    const [token, setToken] = useState(useLoaderData());

    console.log(typeof(token))
    console.log(token)


    const octokit = new Octokit({
        auth: token.token
    })



    octokit.request('GET /app', {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
        }).then((response) => {
            console.log(response)
        })

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
            <nav>
                <ul>
                    <li>
                    <a href={`/contacts/1`}>Your Name</a>
                    </li>
                    <li>
                    <a href={`/contacts/2`}>Your Friend</a>
                    </li>
                </ul>
            </nav>
        </div> */}
        <div id="detail">
            Dashboard
        </div>
      </>
    );
  }
