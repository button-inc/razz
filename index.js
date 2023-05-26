const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios")
const tough = require("tough-cookie");
const path = require("path")

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const baseurl = process.env.BASE_URL || 'http://localhost:3001/'

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve up production assets
app.use(express.static('client/build'));


const Cookie = tough.Cookie;
const cookiejar = new tough.CookieJar();

app.get("/", (req, res) => {
  res.send({ express: 'express backend' });
})

app.post("/auth/login", (req, res) => {
  const location = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`
  res.redirect(location);
})

app.get("/auth/exchange/", (req, res, next) => {
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
    const cookie = Cookie.parse(`token=${access_token}`)

    cookiejar.setCookie(
      cookie,
      baseurl,
      function (err, cookie) {
        if (err) {
          console.log('err', err)
          res.redirect(baseurl)
        }
        res.redirect(`${baseurl}dashboard`)
      }
    );
  })
  .catch(error => {
    // TODO: handle errors
    console.log('err', error)
    next(error)
  });
})

app.get("/github/repo", (req, res) => {
  // get the token cookie
  cookiejar.getCookies(baseurl, function (err, cookies) {
    if (err) {
      console.log('error retrieving cookie', err)
      res.redirect(baseurl)
    }

    const token = cookies[0].value;
    // get repos from github using token
    axios.get(
      "https://api.github.com/user/repos?affiliation=collaborator&per_page=100",
      {
        headers: {
          "Accept": "application/vnd.github+json",
          "Authorization": `Bearer ${token}`,
          "X-GitHub-Api-Version": "2022-11-28"
        }
      }
    )
    .then(response => {
      const data = response.data;
      const repos = data.map(repo => repo.full_name)
      res.send(repos)
    })
    .catch(err => {
      console.log('error fetching repos: ', err)
      res.redirect(baseurl)
    })
  });
})

// serve up the index.html if express doesnt recognize the route
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port, function () {
  console.log("Runnning on " + port);
});
module.exports = app;
