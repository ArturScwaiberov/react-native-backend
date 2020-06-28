const { check } = require('express-validator')

const validation = {
	create: [
		check('fullName', 'обязательно для заполнения')
			.isLength({ min: 3 })
			.withMessage('должно быть больше трёх символов'),
		check('phone').isLength({ min: 12 }).withMessage('должно быть вида: 996-700-126-646'),
		check('gender', 'должно быть заполнено').isIn(['male', 'femail']),
		check('email', 'должно быть заполнено')
			.isLength({ min: 6, max: 100 })
			.isEmail()
			.withMessage('долно быть email адресом'),
		/* check('email').custom((email) => {
			if (alreadyHaveEmail(email)) {
				return Promise.reject('Email already registered')
			}
		}), */
	],
	update: [
		check('fullName', 'обязательно для заполнения')
			.isLength({ min: 3 })
			.withMessage('должно быть больше трёх символов'),
		check('phone').isLength({ min: 12 }).withMessage('должно быть вида: 996-700-126-646'),
		check('gender', 'должно быть заполнено').isIn(['male', 'femail']),
		check('email', 'должно быть заполнено')
			.isLength({ min: 6, max: 100 })
			.isEmail()
			.withMessage('долно быть email адресом'),
	],
}

module.exports = validation
