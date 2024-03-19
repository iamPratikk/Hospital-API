const mongoose = require("mongoose");
//Here we are creating a schema for patient which can have few specified fields
const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  reports: [
    {
      status: {
        type: String,
        required: true,
        enum: [
          "Negative",
          "Travelled-Quarantine",
          "Symptoms-Quarantine",
          "Positive-Admit",
        ],
      },
      date: {
        type: Date,
        required: true,
      },
    },
  ],
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctor",
  },
});

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
