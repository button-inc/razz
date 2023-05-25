const cookieParser = require('cookie-parser')
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios")
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({ express: 'express backend' });
})

app.post("/auth/login", (req, res) => {
  const location = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`
  res.redirect(location);
})

app.get("/auth/exchange/", (req, res) => {
  const code = req.query.code;
  // env params to request access token
  const params = {
    "client_id": process.env.CLIENT_ID,
    "client_secret": process.env.CLIENT_SECRET,
    "code": code
  }

  // request access token
  axios.post(
    "https://github.com/login/oauth/access_token",
    params,
    {
        headers: {
            "Content-Type": "application/json",
        }
    }
  )
  .then(response => {
    const access_token = new URLSearchParams(response.data).get("access_token")
    console.log(access_token)

    // put access_token in cookie session
    res.cookie(`token`, `${access_token}`);
    res.redirect('http://localhost:5173/dashboard')
  })
  .catch(error => {
    // TODO: handle errors
    console.log('err')
  });
})

app.get("/github/repo", (req, res) => {
  console.log('/github/repo')
  console.log(req.cookies)
  res.send(req.cookies);
})

app.get("/github/issues", (req, res) => {
  axios.get(`https://api.github.com/repos/${repo}/issues`, {
    method: "GET",
    headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": `Bearer ${token.token}`,
        "X-GitHub-Api-Version": "2022-11-28",
    }
  })
  const data = response.json()

  const issues = data.map((item) => {
      const container = {};

      container.title = item.title;
      container.number = item.number;
      container.url = item.url;

      return container;
  })
})

app.listen(port, function () {
  console.log("Runnning on " + port);
});
module.exports = app;
