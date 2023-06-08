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

app.get("/auth/exchange/", (req, res, next) => {
  const { code } = req.query;
  // env params to request access token
  const params = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code,
  };

  // request access token
  axios
    .post("https://github.com/login/oauth/access_token", params, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      const token = new URLSearchParams(response.data).get("access_token");
      const cookie = Cookie.parse(`token=${token}`);
      // console.log(token)

      cookiejar.setCookie(cookie, baseurl, (err, cookie) => {
        if (err) {
          res.redirect(baseurl);
        }
        res.redirect(`${baseurl}user`);
      });
    })
    .catch((error) => {
      // TODO: handle errors
      next(error);
    });
});

app.get("/github/user", (req, res) => {
  cookiejar.getCookies(baseurl, (err, cookies) => {
    if (err) {
      res.redirect(baseurl);
    }

    const token = cookies[0].value;

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

    axios({
      url: endpoint,
      method: "post",
      headers: headers,
      data: graphqlQuery,
    }).then((response) => {
      const { data } = response;
      res.send(data);
    });
  });
});

// TODO: tech debt - switch to async/await
app.get("/github/repo", (req, res) => {
  const { page } = req.query;

  // get the token cookie
  cookiejar.getCookies(baseurl, (err, cookies) => {
    if (err) {
      res.redirect(baseurl);
    }

    const token = cookies[0].value;
    axios
      .get(
        `https://api.github.com/user/repos?affiliation=owner,collaborator&page=${page}`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${token}`,
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      )
      .then((response) => {
        const { data } = response;
        res.send(data);
      })
      .catch((error) => {
        console.log("error fetching repos: ", error);
        res.redirect(baseurl);
      });
  });
});

app.get("/github/issues", (req, res) => {
  const { owner, repo } = req.query;

  cookiejar.getCookies(baseurl, (err, cookies) => {
    if (err) {
      res.redirect(baseurl);
    }

    const token = cookies[0].value;
    axios
      .get(`https://api.github.com/repos/${owner}/${repo}/issues`, {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      })
      .then((response) => {
        const { data } = response;
        res.send(data);
      })
      .catch((error) => {
        console.log("error fetching repos: ", error);
        res.redirect(baseurl);
      });
  });
});

app.get("/github/issue", (req, res) => {
  const { owner, repo, issue_number } = req.query;

  cookiejar.getCookies(baseurl, (err, cookies) => {
    if (err) {
      res.redirect(baseurl);
    }

    const token = cookies[0].value;
    axios
      .get(
        `https://api.github.com/repos/${owner}/${repo}/issues/${issue_number}`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${token}`,
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      )
      .then((response) => {
        const { data } = response;
        res.send(data);
      })
      .catch((error) => {
        console.log("error fetching repos: ", error);
        res.redirect(baseurl);
      });
  });
});

app.post("/submitvote", (req, res) => {
  const { vote, repo, issuenumber } = req.body;

  console.log(vote, repo, issuenumber);

  // res.sendStatus(200);

  // token doesn't have permission?
  // "message": "Resource not accessible by integration",
  cookiejar.getCookies(baseurl, (err, cookies) => {
    if (err) {
      res.redirect(baseurl);
    }

    const token = cookies[0].value;

    axios
      .post(
        `https://api.github.com/repos/${repo}/issues/${issuenumber}/comments`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${token}`,
            "X-GitHub-Api-Version": "2022-11-28",
          },
          body: `${vote}`,
        }
      )
      .then((response) => {
        console.log(response.json());
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log("error submitting vote: ", error);
        res.redirect(baseurl);
      });
  });
});

app.get("/checkaccess", (req, res) => {
  cookiejar.getCookies(baseurl, (err, cookies) => {
    if (err) {
      res.redirect(baseurl);
    }

    const token = cookies[0].value;
    axios
      .get(`https://api.github.com/user/installations`, {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      })
      .then((response) => {
        const { data } = response;
        console.log(data);
        res.send(data);
      })
      .catch((error) => {
        console.log("error fetching repos: ", error);
        res.redirect(baseurl);
      });
  });
  // /user/installations
});

// TODO reset user votes when issue changes
let votes = {};

app.post("/vote", (req, res) => {
  // TODO: ensure user has auth token
  // TODO: pass some id in here to ensure votes are attributed to the right thing?
  const { user, vote } = req.body;
  votes[user] = vote;
  return res.json({ message: "Thank You" });
});

const SEND_INTERVAL = 2000;

const writeEvent = (res, sseId, data) => {
  res.write(`id: ${sseId}\n`);
  res.write(`data: ${data}\n\n`);
};

const sendEvent = (_req, res) => {
  res.writeHead(200, {
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
  });

  // todo: create session id based on repo
  const sseId = new Date().toDateString();
  console.log("sseID", sseId);

  setInterval(() => {
    writeEvent(res, sseId, JSON.stringify(votes));
  }, SEND_INTERVAL);

  writeEvent(res, sseId, JSON.stringify(votes));
};

app.get("/party", (req, res) => {
  if (req.headers.accept === "text/event-stream") {
    sendEvent(req, res);
  } else {
    res.json({ message: "Ok" });
  }
});

app.get("/clearvote", (req, res) => {
  votes = {};
  res.json({ message: "Ok" });
});

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`)
);
