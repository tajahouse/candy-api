const db = require('../database/config')
const jwt = require('jsonwebtoken')
const Users = require('../models/users_model')

//status code function-middleware
const stats = (code, msg) => {
	return res.status(code).json({
		message: msg
	})
}

// validation
function validation(stats, req, res, next) {
	if (req.body && req.body.username && req.body.password) {
		next()
	} else {
		// stats(400, "Username or Password not entered")
		res.status(400).json({ message: 'Username or password not entered' })
	}
}

//validateUser
const validateUser = async (stats, req, res, next) => {
	try {
		const validUser = await Users.findBy({ id: req.params.id })
		if (!validUser) {
			return stats(404, 'User does not exist')
		}
		req.user = validUser
		next()
	} catch (err) {
		next(err)
	}
}

function restrict() {
	return async (req, res, next) => {
		try {
			const authErr = { message: 'Invalid Credentials' }
			const token = req.cookies.token || req.headers.authorization
			if (!token) {
				// return stats(401, 'Invalid Credentials 1')
				return res.status(401).json(authErr)
			}
			jwt.verify(token, process.env.JWT_SECRET || "You guys rock!", (err, decoded) => {
				if (err) {
					// return stats(401, 'Invalid Credentials 2')
					return res.status(401).json(authErr)
				}
				next()
			})
		} catch (err) {
			next(err)
		}
	}
}

const validateForm = async (req, res, next) => {
	try {
		if (
			!req.body ||
			req.body.url === '' ||
			req.body.name === '' ||
			req.body.categoryID === '' ||
			req.body.userID === '' ||
			req.body.title === '' ||
			req.body.firstName === '' ||
			req.body.lastName === ''
		) {
			return res.status(400).json({ message: 'Invalid Inputs.' })
		}
		next()
	} catch (error) {
		next(error)
	}
}

module.exports = { validation, validateUser, restrict, stats, validateForm }