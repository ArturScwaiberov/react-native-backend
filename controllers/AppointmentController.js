const { validationResult } = require('express-validator')
const { groupBy, reduce, sortBy } = require('lodash')
const dayjs = require('dayjs')
const ruLocale = require('dayjs/locale/ru')

const { Appointment, Patient } = require('../models')

function AppointmentController() {}

const create = async function (req, res) {
	const errors = validationResult(req)

	const data = {
		patientId: req.body.patientId,
		dentNumber: req.body.dentNumber,
		diagnosis: req.body.diagnosis,
		price: req.body.price,
		date: req.body.date,
		time: req.body.time,
	}

	if (!errors.isEmpty()) {
		return res.status(422).json({
			success: false,
			message: errors.array(),
		})
	}

	const patient = await Patient.findOne({
		_id: data.patientId,
	}).catch((err) => console.log(err.message))

	if (!patient) {
		return res.status(404).json({
			success: false,
			message: 'PATIENT_NOT_FOUND',
		})
	}

	Appointment.create(data, function (err, doc) {
		if (err) {
			return res.status(500).json({
				success: false,
				message: err,
			})
		}

		res.status(201).json({
			success: true,
			data: doc,
		})
	})
}

const update = async function (req, res) {
	const appointmentId = req.params.id
	const errors = validationResult(req)

	const data = {
		dentNumber: req.body.dentNumber,
		diagnosis: req.body.diagnosis,
		price: req.body.price,
		date: req.body.date,
		time: req.body.time,
	}

	if (!errors.isEmpty()) {
		return res.status(422).json({
			success: false,
			message: errors.array(),
		})
	}

	const appointment = await Appointment.findOne({
		_id: appointmentId,
	}).catch((err) => console.log(err.message))

	if (!appointment) {
		return res.status(404).json({
			success: false,
			message: 'APPOINTMENT_NOT_FOUND',
		})
	}

	Appointment.updateOne({ _id: appointmentId }, { $set: data }, function (err, doc) {
		if (err) {
			return res.status(500).json({
				success: false,
				message: err,
			})
		}

		if (!doc) {
			return res.status(404).json({
				success: false,
				message: 'APPOINTMENT_NOT_FOUND',
			})
		}

		res.status(201).json({
			success: true,
			data: doc,
		})
	})
}

const remove = async function (req, res) {
	const appointmentId = req.params.id

	const appointment = await Appointment.findOne({
		_id: appointmentId,
	}).catch((err) => console.log(err.message))

	if (!appointment) {
		return res.status(404).json({
			success: false,
			message: 'APPOINTMENT_NOT_FOUND',
		})
	}

	Appointment.deleteOne({ _id: appointmentId }, (err) => {
		if (err) {
			return res.status(500).json({
				success: false,
				message: err,
			})
		}

		res.json({
			status: 'success',
		})
	})
}

/* .find({})
		.populate('patientId') */

/* .aggregate([
		{
			$group: { _id: '$date', appointments: { $push: '$$ROOT' } },
		},
	]) */

const all = function (req, res) {
	Appointment.find({})
		.populate('patientId')
		.exec(function (err, docs) {
			if (err) {
				return res.status(500).json({
					success: false,
					message: err,
				})
			}

			res.json({
				status: 'success',
				message: reduce(
					//we took all data and group it by date, make from it froups with title of day
					groupBy(docs, 'date'),
					(result, value, key) => {
						result = [...result, { title: dayjs(key).locale('ru').format('D MMMM'), data: value }]
						return result
					},
					[]
					//I want here add sortBy to sort groups by date and by time too
				),
			})
		})
}

AppointmentController.prototype = {
	all,
	create,
	remove,
	update,
}

module.exports = AppointmentController
