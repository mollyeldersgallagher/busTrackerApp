// const router = require("express").Router();
// const multer = require("multer");
// const passport = require("passport");
// const settings = require("../config/passport")(passport);

// const getToken = headers => {
//   if (headers && headers.authorization) {
//     var parted = headers.authorization.split(" ");
//     if (parted.length === 2) {
//       return parted[1];
//     } else {
//       return null;
//     }
//   } else {
//     return null;
//   }
// };

// let Trip = require("../models/trip");

// router.route("/").get((req, res) => {
//   Trip.find()
//     .then(trips => res.json(trips))
//     .catch(err => res.status(400).json("Error: " + err));
// });

// router.route("/:id").get((req, res) => {
//   const tripId = req.params.id;

//   Trip.findById(tripId)
//     .then(result => {
//       if (!result) {
//         return res.status(404).json({
//           message: "trip not found with id " + tripId
//         });
//       }
//       res.json(result);
//     })
//     .catch(err => {
//       if (err.kind === "ObjectId") {
//         return res.status(404).json({
//           message: "trip not found with id " + tripId
//         });
//       }
//       return res.status(500).json({
//         message: "Error retrieving trip with id " + tripId
//       });
//     });
// });

// router.route("/").post(
//   passport.authenticate("jwt", {
//     session: false
//   }),
//   (req, res) => {
//     const token = getToken(req.headers);
//     const trip = req.body;
//     //validate trip
//     if (token) {
//       if (!trip.startPoint) {
//         return res.status(400).json({
//           message: "trip start point can not be empty"
//         });
//       }
//       if (!trip.endPoint) {
//         return res.status(400).json({
//           message: "trip end point can not be empty"
//         });
//       }

//       const newTrip = new Trip(trip);
//       console.log(newTrip);
//       newTrip
//         .save()
//         .then(data => {
//           res.json(data);
//         })
//         .catch(err => res.status(400).json("Error: " + err));
//     } else {
//       return res.status(403).json({
//         success: false,
//         message: "Unauthorized."
//       });
//     }
//   }
// );

// router.route("/:id").put(
//   passport.authenticate("jwt", {
//     session: false
//   }),
//   (req, res) => {
//     const token = getToken(req.headers);
//     const tripId = req.params.id;
//     const newTrip = req.body;
//     if (token) {
//       if (!newTrip.title) {
//         return res.status(400).json({
//           message: "Trip title can not be empty"
//         });
//       }

//       // Find Trip and update it with the request body
//       Trip.findByIdAndUpdate(tripId, newTrip, {
//         new: true
//       })
//         .then(trip => {
//           if (!trip) {
//             return res.status(404).json({
//               message: "trip not found with id " + tripId
//             });
//           }
//           res.json(trip);
//         })
//         .catch(err => {
//           if (err.kind === "ObjectId") {
//             return res.status(404).json({
//               message: "trip not found with id " + tripId
//             });
//           }
//           return res.status(500).json({
//             message: "Error updating trip with id " + tripId
//           });
//         });
//     } else {
//       return res.status(403).json({
//         success: false,
//         message: "Unauthorized"
//       });
//     }
//   }
// );

// router.route("/:id").delete(
//   passport.authenticate("jwt", {
//     session: false
//   }),
//   (req, res) => {
//     const token = getToken(req.headers);
//     const tripId = req.params.id;
//     if (token) {
//       Trip.findByIdAndRemove(tripId)
//         .then(trip => {
//           if (!trip) {
//             return res.status(404).json({
//               message: "trip not found with id " + tripId
//             });
//           }
//           res.json({
//             message: "trip deleted successfully!"
//           });
//         })
//         .catch(err => {
//           if (err.kind === "ObjectId" || err.name === "NotFound") {
//             return res.status(404).json({
//               message: "trip not found with id " + tripId
//             });
//           }
//           return res.status(500).send({
//             message: "Could not delete trip with id " + tripId
//           });
//         });
//     } else {
//       return res.status(403).json({
//         success: false,
//         messsage: "Unuthorized"
//       });
//     }
//   }
// );

// module.exports = router;
