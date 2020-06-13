const { check } = require('express-validator')

const validation = {
	create: [
		check('patientId').isLength({ min: 3, max: 50 }),
		check('dentNumber').isInt({ min: 1, max: 42 }),
		check('diagnosis').isLength({ min: 3 }),
		check('price').isInt({ min: 0, max: 1000000 }),
		check('date').isLength({ min: 3, max: 50 }),
		check('time').isLength({ min: 3, max: 50 }),
	],
	update: [
		check('dentNumber').isInt({ min: 1, max: 42 }),
		check('diagnosis').isLength({ min: 3 }),
		check('price').isInt({ min: 0, max: 1000000 }),
		check('date').isLength({ min: 3, max: 50 }),
		check('time').isLength({ min: 3, max: 50 }),
	],
}

module.exports = validation
