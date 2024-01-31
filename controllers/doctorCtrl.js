const appointmentModel = require("../models/appointmentModel");
const doctorModel = require('../models/doctorModel');
const userModel = require("../models/userModels");

const getDoctorInfoController = async (req,res) => {
    try {
        const doctor = await doctorModel.findOne({userId: req.body.userId});
        res.status(200).send({
            success:true,
            message:'Doctor data fetched successfully',
            data: doctor,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error in fetching Doctor details',
        });
    }
};

//update doc profile
const updateProfileController = async (req,res) => {
    try {
        const doctor = await doctorModel.findOneAndUpdate({userId:req.body.userId}, req.body);
        res.status(200).send({
            success:true,
            message:'Doctor Profile Updated',
            data: doctor,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Doctor Profile update issue',
            error,
        });
    }
};

//get single doctor
const getDoctorByIdController = async (req,res) => {
    try {
        const doctor = await doctorModel.findOne({_id:req.body.doctorId});
        res.status(200).send({
            success:true,
            message:'Doctor Info fetched successfully',
            data:doctor,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error in fetching Doctor Info',
        });
    }
};

const doctorAppointmentsController = async (req, res) => {
    try {
      const doctor = await doctorModel.findOne({ userId: req.body.userId });
      const appointments = await appointmentModel.find({
        doctorId: doctor._id,
      });
      res.status(200).send({
        success: true,
        message: "Doctor's Appointments fetch Successfully",
        data: appointments,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in Doctor Appointments",
      });
    }
  };

  const updateStatusController = async (req, res) => {
    try {
      const { appointmentsId, status } = req.body;
      const appointments = await appointmentModel.findByIdAndUpdate(
        appointmentsId,
        { status }
      );
      const user = await userModel.findOne({ _id: appointments.userId });
      const notifcation = user.notification;
      notifcation.push({
        type: "status-updated",
        message: `Your Appointment has been Updated ${status}`,
        onCLickPath: "/doctor-appointments",
      });
      await user.save();
      res.status(200).send({
        success: true,
        message: "Appointment Status Updated",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error In Update Status",
      });
    }
  };
  

module.exports = {getDoctorInfoController, updateProfileController, getDoctorByIdController, doctorAppointmentsController, updateStatusController};

// let formmated =`${value.$D}-${value.$M + 1}-${value.$y}`
// console.log(formmated)
// setDate(formmated);
// let timeFormmated = `${value.$H}:${value.$m}`
// console.log(timeFormmated)
//   setTime(timeFormmated);