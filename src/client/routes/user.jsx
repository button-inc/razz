import Navbar from "../components/navbar";
import { useLoaderData, Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
export function loader() {
  return fetch("/github/user");
}

export default function User() {
  const { data } = useLoaderData();

  const handleSubmit = async () => {
    await fetch(`/checkaccess`);
  };

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
                label="Enter code"
                variant="outlined"
                margin="normal"
              />
              <Link className="link-button centerpage"> Join party </Link>
            </div>
            <Button
              onClick={() => {
                handleSubmit();
              }}
            >
              {" "}
              check permissions{" "}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
