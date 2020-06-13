const mongoose = require('mongoose')
const { Schema } = mongoose

const AppointmentSchema = new Schema(
	{
		patientId: { type: Schema.Types.ObjectId, ref: 'Patient' },
		dentNumber: Number,
		diagnosis: String,
		description: String,
		price: Number,
		date: String,
		time: String,
	},
	{
		timestamps: true,
	}
)

const Appointment = mongoose.model('Appointment', AppointmentSchema)

module.exports = Appointment
