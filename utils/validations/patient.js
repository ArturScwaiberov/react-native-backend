const { check } = require('express-validator')

const validation = {
	create: [
		check('fullName').isLength({ min: 4 }),
		check('phone').isLength({ min: 12 }),
		check('email').custom((email) => {
			if (alreadyHaveEmail(email)) {
				return Promise.reject('Email already registered')
			}
		}),
	],
}

module.exports = validation
