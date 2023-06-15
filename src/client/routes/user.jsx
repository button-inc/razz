import Navbar from "../components/navbar";
import { useLoaderData, Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export function loader() {
  return fetch("/github/user");
}

export default function User() {
  const { data } = useLoaderData();
  const [code, setCode] = useState();
  const [repo, setRepo] = useState();

  return (
    <>
      <Navbar />
      <div className="centerpage">
        <div className="login">
          {data?.viewer?.login && <h2>{`Welcome ${data.viewer.login}`}</h2>}
          <div style={{ display: "flex", flexDirection: "row" }}>
            {/* <div>
              <h3>Start a planning party</h3>
              <Link className="link-button" to={"/repos"}>
                {" "}
                Import GitHub Repositories{" "}
              </Link>
            </div> */}
            <div>
              <div className="centerpage">
                <h3 style={{ marginBottom: "0" }}>
                  Import a GitHub repository
                </h3>
              </div>
              <div className="centerpage">
                <TextField
                  id="outlined-basic"
                  label="Enter repository (owner/repo)"
                  variant="outlined"
                  margin="normal"
                  value={repo}
                  onChange={(event) => {
                    setRepo(event.target.value);
                  }}
                />
              </div>
              <Link className="link-button centerpage" to={`/vote/${repo}`}>
                {" "}
                Import GitHub Repository{" "}
              </Link>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "1rem",
                marginRight: "2rem",
              }}
            >
              or
            </div>
            <div>
              <div className="centerpage">
                <h3 style={{ marginBottom: "0" }}>Join a planning party</h3>
              </div>
              <div className="centerpage">
                <TextField
                  id="outlined-basic"
                  label="Enter code (owner/repo)"
                  variant="outlined"
                  margin="normal"
                  value={code}
                  onChange={(event) => {
                    setCode(event.target.value);
                  }}
                />
              </div>
              <Link className="link-button centerpage" to={`/vote/${code}`}>
                {" "}
                Join party{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
