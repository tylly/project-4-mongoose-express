const express = require('express')
const passport = require('passport')
const Project = require('../models/project')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

//MAKING A ROUTER
const router = express.Router()
// importing post model to access database 


// POST route - add like
router.post('/like/:projectId', requireToken, (req, res, next) => {
    const projectId = req.params.projectId
    req.body.owner = req.user.id // change to token
    console.log('in the like route - ProjectID', projectId)
    console.log('req.user.id', req.user.id)

    Project.findById(projectId)
        .then(project => {
            project.likes.push(req.body.owner)
            return project.save()
        })
        .then((project) => {
			res.status(201).json({ project: project.toObject() })
		})
        .catch(next)
})

//DELETE route - remove like
router.delete('/like/:projectId', requireToken, (req, res, next) => {
    const projectId = req.params.projectId
    req.body.owner = req.user.id // change to token

    Project.findById(projectId)
        //after we found a post we want to take that post and add the comments
        .then(project => {
            //single post doc there is a field called comments
            project.likes.remove(req.body.owner)

            // if we change a doc, we have to return and call .save() on the doc
            return project.save()
        })
        .then((project) => {
			res.status(201).json({ project: project.toObject() })
		})
        .catch(next)
})
module.exports = router