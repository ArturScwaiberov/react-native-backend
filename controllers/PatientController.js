const { Patient, Appointment } = require('../models')

const { validationResult } = require('express-validator')
const { orderBy, reduce, sortBy } = require('lodash')

function PatientController() {}

const create = function (req, res) {
	const errors = validationResult(req)

	const data = {
		avatar: req.body.avatar,
		fullName: req.body.fullName,
		gender: req.body.gender,
		email: req.body.email,
		phone: req.body.phone,
	}

	if (!errors.isEmpty()) {
		return res.status(422).json({
			success: false,
			message: errors.array(),
		})
	}

	Patient.create(data, function (err, doc) {
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
	const patientId = req.params.id
	const errors = validationResult(req)

	const data = {
		avatar: req.body.avatar,
		fullName: req.body.fullName,
		gender: req.body.gender,
		email: req.body.email,
		phone: req.body.phone,
	}

	if (!errors.isEmpty()) {
		return res.status(422).json({
			success: false,
			message: errors.array(),
		})
	}

	const patient = await Patient.findOne({ _id: patientId }, function (err) {
		if (err) {
			console.log(err)
		}
	})

	if (!patient) {
		return res.status(404).json({
			success: false,
			message: 'PATIENT_NOT_FOUND',
		})
	}

	Patient.updateOne({ _id: patientId }, { $set: data }, function (err, doc) {
		if (err) {
			return res.status(500).json({
				success: false,
				message: err,
			})
		}

		if (!doc) {
			return res.status(404).json({
				success: false,
				message: 'PATIENT_NOT_FOUND',
			})
		}

		res.status(201).json({
			success: true,
			data: doc,
		})
	})
}

const remove = async function (req, res) {
	const patientId = req.params.id

	const patient = await Patient.findOne({ _id: patientId }, function (err) {
		if (err) {
			console.log(err.message)
		}
	})

	if (!patient) {
		return res.status(404).json({
			success: false,
			message: 'PATIENT_NOT_FOUND',
		})
	}

	//находим все приемы пациента
	const patientsAppointments = await Appointment.find({ patientId: patientId })
		.populate('patients')
		.catch((err) => {
			console.log(err.message)
		})

	//удаляем зависимости тоже вместе с самим пациентом
	patientsAppointments.forEach((patApp) => {
		Appointment.deleteOne({ _id: patApp._id }, function (err) {
			if (err) {
				console.log(err.message)
			}
		})
	})

	Patient.deleteOne({ _id: patientId }, (err) => {
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

const show = async function (req, res) {
	const patientId = req.params.id

	try {
		const patient = await Patient.findById(patientId).populate('appointments').exec()
		res.json({
			status: 'success',
			data: {
				...patient._doc,
				appointments: orderBy(
					patient.appointments,
					[
						function (item) {
							return new Date(item.date + ' ' + item.time)
						},
					],
					['desc']
				),
			},
		})
	} catch (e) {
		return res.status(404).json({
			success: false,
			message: 'PATIENT_NOT_FOUND',
		})
	}
}

const all = function (req, res) {
	Patient.find({}, function (err, docs) {
		if (err) {
			return res.status(500).json({
				success: false,
				message: err,
			})
		}

		res.json({
			status: 'success',
			message: docs,
		})
	})
}

PatientController.prototype = {
	all,
	create,
	remove,
	update,
	show,
}

module.exports = PatientController
