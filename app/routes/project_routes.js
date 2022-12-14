// Express docs: http://expressjs.com/en/api.html
const express = require("express")
// Passport docs: http://www.passportjs.org/docs/
const passport = require("passport")

// pull in Mongoose model for projects
const Project = require("../models/project")

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require("../../lib/custom_errors")

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require("../../lib/remove_blank_fields")
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate("bearer", { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX 
// GET /projects
router.get("/projects", (req, res, next) => {
  //we want anyone to see projects so no requireToken
  //if we wanted to protect resources we could add that back in between
  //route and callback as second argument
  Project.find()
    .populate('developers')
    .then((projects) => {
      // `projects` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return projects.map((project) => project.toObject())
    })
    // respond with status 200 and JSON of the projects
    .then((projects) => res.status(200).json({ projects: projects }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET 
router.get("/projects/:id", (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Project.findById(req.params.id)
    .populate('developers')
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "project" JSON
    .then((project) =>
      res.status(200).json({ project: project.toObject() })
    )
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /destinations
router.post("/projects/", requireToken, (req, res, next) => {
	console.log('hit')
  // set owner of new projectss to be current user
  req.body.project.owner = req.user.id
  Project.create(req.body.project)
  // respond to succesful `git statuscreate` with status 201 and JSON of new "project"
  .then((project) => {
    res.status(201).json({ project: project.toObject() })
  })
  .catch(next)
})

// UPDATE - Add developer to project
// PATCH /projects/5a7db6c74d55bc51bdf39793
router.patch( "/projects/addDev/:projectId", requireToken, removeBlanks, (req, res, next) => {
  console.log('ADD DEV TO PROJECT ====>> req.params\n', req.params)
  console.log('reqbody ADD DEV TO PROJ===>>\n', req.body)
  Project.findById(req.params.projectId)
    .then(handle404)
    .then((project) => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, project)
      req.body.developers.forEach(dev => {
        project.developers.push(dev)
      })
      return project.save()
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
}
)

// UPDATE
// PATCH /projects/5a7db6c74d55bc51bdf39793
router.patch( "/projects/:id", requireToken, removeBlanks, (req, res, next) => {
    // if the client attempts to change the `owner` property by including a new
    // owner, prevent that by deleting that key/value pair
    delete req.body.project.owner
    console.log('req.params\n', req.params)
    console.log('reqbody\n', req.body)
    Project.findById(req.params.id)
      .then(handle404)
      .then((project) => {
        // pass the `req` object and the Mongoose record to `requireOwnership`
        // it will throw an error if the current user isn't the owner
        requireOwnership(req, project)

        // pass the result of Mongoose's `.update` to the next `.then`
        return project.updateOne(req.body.project)
      })
      // if that succeeded, return 204 and no JSON
      .then(() => res.sendStatus(204))
      // if an error occurs, pass it to the handler
      .catch(next)
  }
)

// DESTROY
// DELETE 
router.delete("/projects/:id", requireToken, (req, res, next) => {
    Project.findById(req.params.id)
    .then(handle404)
    .then((project) => {
      // throw an error if current user doesn't own `project`
      requireOwnership(req, project)
      // delete the project ONLY IF the above didn't throw
      project.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})



module.exports = router
