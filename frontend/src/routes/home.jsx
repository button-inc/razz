import { useState } from "react";

const getToken = async (code, setToken) => {
    console.log('getToken', code)
    const res = await fetch(`http://localhost:3001/api/github/${code}`)
    await res.json().then((result) => {
        console.log(result);
        setToken(result)
    });
}

export default function Home() {
    // code from the github redirect needed to exchange for an api token
    const code = new URLSearchParams(location.search).get('code')
    const [token, setToken] = useState();

    if (code && !token) {
        getToken(code, setToken)
    }

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
