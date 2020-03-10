const router = require("express").Router();
const express = require("express");
const fetch = require("node-fetch");
const axios = require("axios");
//var fetch = require('node-fetch');

router.get("/", (req, res) => {
  fetch(`https://data.smartdublin.ie/cgi-bin/rtpi/routelistinformation`)
    .then(res => res.json())
    .catch(err => {
      res.status(400).json("Error: " + err);
      console.log(err);
    });
});
router.route("/routes/:operator").get((req, res) => {
  const operator = req.params.operator;
  fetch(
    `https://data.smartdublin.ie/cgi-bin/rtpi/routelistinformation?operator=${operator}`
  )
    .then(res => res.json())
    .then(routes => res.json(routes))
    .catch(err => {
      res.status(400).json("Error: " + err);
      // console.log(err);
    });
});
router.route("/route/:routeid").get((req, res) => {
  const routeid = req.params.routeid;
  const operator = "dublinBus";

  fetch(
    `https://data.smartdublin.ie/cgi-bin/rtpi/routeinformation?routeid=${routeid}&operator=${operator}&format=json`
  )
    .then(res => res.json())
    .then(stop => res.json(stop))
    .catch(err => {
      res.status(400).json("Error: " + err);
      // console.log(err);
    });
  // res.json({message: "You are trying to see a list of stop info"});
});

router.route("/stop/:stopid").get((req, res) => {
  const stopid = req.params.stopid;
  fetch(
    `https://data.smartdublin.ie/cgi-bin/rtpi/busstopinformation?stopid=${stopid}&format=json`
  )
    .then(res => res.json())
    .then(stop => res.json(stop))
    .catch(err => {
      res.status(400).json("Error: " + err);
      // console.log(err);
    });
  // res.json({message: "You are trying to see a list of stop info"});
});

router.route("/realtime/:stopid").get((req, res) => {
  const stopid = req.params.stopid;
  fetch(
    `https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=${stopid}&format=json`
  )
    .then(res => res.json())
    .then(realtime => res.json(realtime))
    .catch(err => {
      res.status(400).json("Error: " + err);
      // console.log(err);
    });
  // res.json({message: "You are trying to see a list of stop info"});
});

router.route("/operators").get((req, res) => {
  fetch(`https://data.smartdublin.ie/cgi-bin/rtpi/operatorinformation`)
    .then(res => res.json())
    .then(realtime => res.json(realtime))
    .catch(err => {
      res.status(400).json("Error: " + err);
      // console.log(err);
    });
  // res.json({message: "You are trying to see a list of stop info"});
});

// router.route("/operators").get((req, res) => {
//   const stopid = req.params.stopid;
//   fetch(`https://data.smartdublin.ie/cgi-bin/rtpi/operatorinformation`)
//     .then(res => res.json())
//     .then(op => res.json(op))
//     .catch(err => {
//       res.status(400).json("Error: " + err);
//       // console.log(err);
//     });
//   // res.json({message: "You are trying to see a list of stop info"});
// });

module.exports = router;
