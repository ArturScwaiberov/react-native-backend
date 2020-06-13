const mongoose = require('mongoose')
const { Schema } = mongoose

const PatientSchema = new Schema(
	{
		id: String,
		avatar: String,
		fullName: String,
		gender: String,
		email: String,
		phone: String,
	},
	{
		timestamps: true,
	}
)

PatientSchema.virtual('appointments', {
	ref: 'Appointment',
	localField: '_id',
	foreignField: 'patientId',
	justOne: false, // set true for one-to-one relationship
})

const Patient = mongoose.model('Patient', PatientSchema)

module.exports = Patient
