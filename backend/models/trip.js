const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
  startPoint: {
    type: Object,
    latitude: Number,
    longitude: Number
  },
  endPoint: {
    type: Object,
    latitude: Number,
    longitude: Number
  },
  totalDist: {
    type: String,
    default: "-- km"
  },
  rewardPoints: {
    type: Number,
    default: " 0 points"
  },
  users: [
    {
      type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
      }
    }
  ]
});

module.exports = mongoose.model("Trip", TripSchema);
