const express = require("express");
const ViteExpress = require("vite-express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const tough = require("tough-cookie");
dotenv.config();

const port = process.env.PORT || 3000;
const baseurl = process.env.BASE_URL || "http://localhost:3000/";
const mode = process.env.VITE_MODE || "development";

const app = express();
ViteExpress.config({ mode: mode });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Cookie } = tough;
const cookiejar = new tough.CookieJar();

app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});

app.post("/auth/login", (req, res) => {
  const location = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${baseurl}auth/exchange/`;
  res.redirect(location);
});

app.get("/auth/exchange/", async (req, res, next) => {
  console.log("/auth/exchange/");

  try {
    const { code } = req.query;
    // env params to request access token
    const params = {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code,
    };

    // request access token
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      params,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const token = new URLSearchParams(response.data).get("access_token");
    const cookie = Cookie.parse(`token=${token}`);
    const jar = await cookiejar.setCookie(cookie, baseurl);

    res.redirect(`${baseurl}user`);
  } catch (error) {
    return next(error);
  }
});

app.get("/github/user", async (req, res, next) => {
  console.log("/github/user/");

  try {
    const cookie = await cookiejar.getCookies(baseurl);
    const token = await cookie[0].value;

    const endpoint = "https://api.github.com/graphql";
    const headers = {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const graphqlQuery = {
      operationName: "getUser",
      query: `query getUser{viewer {login}}`,
      variables: {},
    };

    const response = await axios({
      url: endpoint,
      method: "post",
      headers: headers,
      data: graphqlQuery,
    });

    const { data } = await response;

    res.json(data);
  } catch (error) {
    return next(error);
  }
});

app.get("/github/repo", async (req, res, next) => {
  console.log("/github/repo");
  try {
    const { page } = req.query;
    console.log("fetching repos page", page);

    // get the token cookie
    const cookies = await cookiejar.getCookies(baseurl);

    const token = await cookies[0]?.value;

    const response = await axios.get(
      `https://api.github.com/user/repos?affiliation=collaborator&page=${page}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    const { data } = await response;

    res.json(data);
  } catch (error) {
    return next(error);
  }
});

app.get("/github/repo/owner", async (req, res, next) => {
  console.log("/github/repo");
  try {
    const { page } = req.query;
    console.log("fetching repos page", page);

    // get the token cookie
    const cookies = await cookiejar.getCookies(baseurl);

    const token = await cookies[0]?.value;

    const response = await axios.get(
      `https://api.github.com/user/repos?affiliation=owner&page=${page}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    const { data } = await response;

    res.json(data);
  } catch (error) {
    return next(error);
  }
});

app.get("/github/repo/orgmember", async (req, res, next) => {
  console.log("/github/repo");
  try {
    const { page } = req.query;
    console.log("fetching repos page", page);

    // get the token cookie
    const cookies = await cookiejar.getCookies(baseurl);

    const token = await cookies[0]?.value;

    const response = await axios.get(
      `https://api.github.com/user/repos?affiliation=organization_member&page=${page}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    const { data } = await response;

    res.json(data);
  } catch (error) {
    return next(error);
  }
});

app.get("/github/issues", async (req, res, next) => {
  console.log("/github/issues");
  try {
    const { owner, repo } = req.query;

    // get the token cookie
    const cookies = await cookiejar.getCookies(baseurl);

    const token = await cookies[0]?.value;

    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/issues`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    const { data } = await response;
    res.json(data);
  } catch (error) {
    return next(error);
  }
});

app.get("/github/issue", async (req, res, next) => {
  console.log("/github/issue");
  try {
    const { owner, repo, issue_number } = req.query;

    const cookies = await cookiejar.getCookies(baseurl);

    const token = await cookies[0]?.value;

    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/issues/${issue_number}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    const { data } = await response;
    res.json(data);
  } catch (error) {
    return next(error);
  }
});

app.post("/submitvote", async (req, res, next) => {
  console.log("/submitvote");
  try {
    const { vote, repo, issuenumber } = req.body;

    const cookies = await cookiejar.getCookies(baseurl);
    const token = await cookies[0]?.value;

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    // submit a comment on the issue
    const URL = `https://api.github.com/repos/${repo}/issues/${issuenumber}/comments`;

    const response = await axios({
      url: URL,
      method: "post",
      headers: headers,
      data: { body: `${vote}` },
    });

    const { data } = await response;
    res.json(data);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

let party = { votes: {}, people: [] };

app.post("/vote", async (req, res, next) => {
  console.log("/vote");
  // TODO: ensure user has auth token
  // TODO: pass some id in here to ensure party are attributed to the right thing?
  try {
    const { user, vote } = req.body;
    party.votes[user] = vote;
    return res.json({ message: "Thank You" });
  } catch (error) {
    return next(error);
  }
});

app.post("/room", async (req, res, next) => {
  console.log("/room");
  try {
    const { user } = req.body;
    if (!(party.people.indexOf(user) > -1)) {
      console.log(user, " joined");
      party.people.push(user);
    }
    return res.json({ message: "Connected" });
  } catch (error) {
    return next(error);
  }
});

const SEND_INTERVAL = 2000;

const writePartyEvent = (res, sseId, data) => {
  res.write("event: party\n");
  res.write(`id: ${sseId}\n`);
  res.write(`data: ${data}\n\n`);
};

const sendEvent = (_req, res) => {
  res.writeHead(200, {
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
  });

  const { repo } = _req.query;
  console.log(repo);
  // todo: check if sseId already exists
  // inform user there is already a session and redirect
  // inform user who is the party leader?
  // hash this??
  const sseId = repo;
  console.log("sseID", sseId);

  setInterval(() => {
    writePartyEvent(res, sseId, JSON.stringify(party));
  }, SEND_INTERVAL);

  writePartyEvent(res, sseId, JSON.stringify(party));
};

// TODO: add options to the url or the request body when creating the sse connection
app.get("/party", (req, res) => {
  req.on("close", () => {
    console.log("disconnected");
  });

  // TODO: Auth
  console.log("/party");
  if (req.headers.accept === "text/event-stream") {
    sendEvent(req, res);
  } else {
    res.json({ message: "Ok" });
  }
});

app.get("/clearvote", (req, res) => {
  party.votes = {};
  res.json({ message: "Ok" });
});

app.get("/endsession", (req, res, next) => {
  party = { votes: {}, people: [] };
  res.redirect(`${baseurl}user`);
});

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`)
);
