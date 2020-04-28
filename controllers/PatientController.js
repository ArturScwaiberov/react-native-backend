const { Patient } = require('../models')

const { validationResult } = require('express-validator')

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
}

module.exports = PatientController
