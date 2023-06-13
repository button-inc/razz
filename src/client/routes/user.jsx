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

  return (
    <>
      <Navbar />
      <div className="centerpage">
        <div className="login">
          {data?.viewer?.login && <h2>{`Welcome ${data.viewer.login}`}</h2>}
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <h3>Start a planning party</h3>
              <Link className="link-button" to={"/repos"}>
                {" "}
                Import GitHub Repositories{" "}
              </Link>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", margin: "1rem" }}
            >
              or
            </div>
            <div>
              <h3 style={{ marginBottom: "0" }}>Join a planning party</h3>
              <TextField
                id="outlined-basic"
                className="centerpage"
                label="Enter code (owner/repo)"
                variant="outlined"
                margin="normal"
                value={code}
                onChange={(event) => {
                  setCode(event.target.value);
                }}
              />
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
