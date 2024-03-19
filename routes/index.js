const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const patientController = require("../controllers/patientController");
const passport = require('passport');

router.post("/doctors/register", userController.registerDoctor);
router.post("/doctors/login", userController.login);
router.post("/patients/register", passport.authenticate('jwt', {session:false})   ,patientController.registerPatient );
router.post("/patients/:id/create_report", passport.authenticate('jwt', {session:false}) , patientController.createReport );
router.get("/patients/:id/all_reports", patientController.allReports );
router.get("/reports/:status", patientController.filteredPatients);


module.exports = router;
