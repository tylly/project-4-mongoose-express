const express = require('express')
const passport = require('passport')
const Developer = require('../models/developer')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// INDEX
// GET /developers
router.get('/developers', (req, res, next) => {
    console.log('im in the index route')
	Developer.find({})
		.then((developers) => {
			return developers.map((developer) => developer.toObject())
		})
		.then((developers) => res.status(200).json({ developers: developers }))
		.catch(next)
})

// SHOW
// GET /developers/5a7db6c74d55bc51bdf39793
router.get('/developers/:id', (req, res, next) => {
	Developer.findById(req.params.id)
		.then(handle404)
		.then((developer) => res.status(200).json({ developer: developer.toObject() }))
		.catch(next)
})

// Get dev to add to project
// GET /developers/name
router.get('/developers/name/:name', (req, res, next) => {
	Developer.findOne({name: {$regex: req.params.name}})
		.then(handle404)
		.then((developer) => res.status(200).json({ developer: developer.toObject() }))
		.catch(next)
})

// CREATE
// POST /developers
router.post('/developers', requireToken, (req, res, next) => {
    console.log('Inside the create route')
    console.log('reqbody', req.body)
	req.body.developer.owner = req.user.id

	Developer.create(req.body.developer)
		.then((developer) => {
			res.status(201).json({ developer: developer.toObject() })
		})
		.catch(next)
})

router.patch('/developers/addProj/:projectId/:devId', requireToken, removeBlanks, (req, res, next) => {
	delete req.body.developer.owner

	Developer.findById(req.params.devId)
		.then(handle404)
		.then((developer) => {
			requireOwnership(req, developer)
			developer.projects.push(req.params.projectId)
			return developer.save()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// UPDATE
// PATCH /developers/5a7db6c74d55bc51bdf39793
router.patch('/developers/:id', requireToken, removeBlanks, (req, res, next) => {
	delete req.body.developer.owner

	Developer.findById(req.params.id)
		.then(handle404)
		.then((developer) => {
			requireOwnership(req, developer)
			return developer.updateOne(req.body.developer)
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})


// DESTROY
// DELETE /developers/5a7db6c74d55bc51bdf39793
router.delete('/developers/:id', requireToken, (req, res, next) => {
	Developer.findById(req.params.id)
		.then(handle404)
		.then((developer) => {
			requireOwnership(req, developer)
			developer.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router
