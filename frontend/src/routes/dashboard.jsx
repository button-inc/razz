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




    // List repositories accessible to the user access token
    //https://docs.github.com/en/rest/apps/installations?apiVersion=2022-11-28#list-repositories-accessible-to-the-user-access-token
    //     curl -L \
    //   -H "Accept: application/vnd.github+json" \
    //   -H "Authorization: Bearer ghu_TGFGmsUx7vjayvXgVLXDeFtY12vrQw0Ae4c3"\
    //   -H "X-GitHub-Api-Version: 2022-11-28" \
    //   https://api.github.com/user/installations/1/repositories

    // "message": "Not Found",


    //   curl --request GET \
    // --url "https://api.github.com/user" \
    // --header "Accept: application/vnd.github+json" \
    // --header "Authorization: Bearer ghu_o7IEtTPpVXJZQGz8QA9rKzu1p3cREe29SSaJ" \
    // --header "X-GitHub-Api-Version: 2022-11-28"

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
