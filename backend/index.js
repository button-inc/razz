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
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
})

app.get("/api/github/:code", (req, res) => {

  const { code } = req.params;
  const params = {
      "client_id": process.env.CLIENT_ID,
      "client_secret": process.env.CLIENT_SECRET,
      "code": code
  }

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
    const data = response.data.split('&')

    if (data[0].includes("access_token")) {
      const token = data[0].split('=')[1]
      console.log('got token')
      res.status(200).send({"token": token})
    }
    else if (data[0].includes("error")){
      console.log('error')
      res.status(400).send({"error": data[0]})
    }

  })
  .catch(error => {
    res.send(JSON.stringify(error));
  });
});

app.listen(port, function () {
  console.log("Runnning on " + port);
});
module.exports = app;
