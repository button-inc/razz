import { useState } from "react";
import { useLoaderData } from "react-router-dom";

export function loader ({ request }) {
    console.log('home loader')
    const url = new URL(request.url);
    const code = url.searchParams.get('code')
    return fetch(`http://localhost:3001/api/github/${code}`);
}

export default function Dashboard() {

    // code from the github redirect needed to exchange for an api token
    const [token, setToken] = useState(useLoaderData());

    // use token to make api requests


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
