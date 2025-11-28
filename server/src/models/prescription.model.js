import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    medicalSupplies: { 
        type: [String], 
        required: true
    },
    instructions: { 
        type: String, 
        required: true 
    },
    notes: {
      type: String,
      required: false,
    },
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);

export default Prescription;
