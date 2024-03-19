const Patient = require("../models/patient");

//This action registers a new patient
//we must pass required json data like patients name and doctors ID
module.exports.registerPatient = async (req,res,next)=>{
    try{

        const patient = await Patient.create(req.body);
        console.log(req.body);
        if(patient){
            res.status(200).json({
                success : true,
                message : 'Succesfully created a pateint'
            })
        }

    }catch(err){
        res.status(500).json({
            success : false,
            message : "Error in creating doctor"
        })
    }
    }

//This will create a report for a patient found by the id given in the url params
module.exports.createReport = async (req,res,next)=>{
    try{
        const patient = await Patient.findById(req.params.id);
        if(patient){
            patient.reports.push({
                status : req.body.status,
                date : Date.now()
            });
            patient.save();
            res.status(200).json({
                seccess : true,
                message : "Report has been created"
            });
        }
    }catch(err){
        res.status(500).json({
            success : false,
            message : "Error in creating Report"
        })
    }
}

//This will give all the reports for a patient
module.exports.allReports = async (req,res,next)=>{
    try{
        const patient = await Patient.findById(req.params.id).populate('reports');
        if(patient){
            res.status(200).json({
                success : true,
                message : "All reports are below",
                data : patient.reports
            })
        }

    }catch(err){
        res.status(500).json({
            success : false,
            message : "Error in generating all reports"
        })
    }
}

//This is filter the patients with a specific status from all the patient list
module.exports.filteredPatients = async (req,res,next)=>{
    try{
        const patients = await Patient.find({
            reports : {$elemMatch : {status : req.params.status}},
        })
        if(patients){
            console.log("patients found",patients);
            res.status(200).json({
                success : true,
                mesage : "List of Patients are below",
                data : patients
            })
        }
        
    }catch(err){
        res.status(500).json({
            success : false,
            message : "cannot fetch patients data"
        })
    }
}
