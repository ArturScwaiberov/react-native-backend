const { check } = require('express-validator')
const dentNumbers = [
	11,
	12,
	13,
	14,
	15,
	16,
	17,
	18,
	21,
	22,
	23,
	24,
	25,
	26,
	27,
	28,
	31,
	32,
	33,
	34,
	35,
	36,
	37,
	38,
	41,
	42,
	43,
	44,
	45,
	46,
	47,
	48,
]
const startDate = new Date()

const validation = {
	create: [
		check('patientId').isLength({ min: 3, max: 50 }),
		check('dentNumber', 'должно соответствовать зубной формуле').isIn(dentNumbers),
		check('diagnosis').isLength({ min: 3 }).withMessage('слишком короткое'),
		check('price').isInt({ min: 0, max: 1000000 }).withMessage('обязательно для заполнения'),
		check(['date'], 'обязательно для заполнения')
			.isAfter(new Date(startDate).toDateString())
			.withMessage('не получается создать прием в прошедшем времени..'),
		check('time').isLength({ min: 3, max: 50 }).withMessage('обязательно для заполнения'),
	],
	update: [
		check('dentNumber', 'должно соответствовать зубной формуле').isIn(dentNumbers),
		check('diagnosis').isLength({ min: 3 }).withMessage('слишком короткое'),
		check('price').isInt({ min: 0, max: 1000000 }).withMessage('обязательно для заполнения'),
		check(['date', 'time'], 'обязательно для заполнения')
			.isAfter(new Date(startDate).toDateString())
			.withMessage('не получается создать прием в прошедшем времени..'),
		check('time').isLength({ min: 3, max: 50 }),
	],
}

module.exports = validation
