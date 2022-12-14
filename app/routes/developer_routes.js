const express = require('express')
const passport = require('passport')
const Developer = require('../models/developer')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()
const request = require('request-promise')
const cheerio = require('cheerio')
const axios = require('axios')

// INDEX
// GET /developers
router.get('/developers', (req, res, next) => {
    console.log('im in the index route')
	Developer.find({})
		.populate('projects')
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
		.populate('projects')
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
	req.body.developer.avatar = null
	let avatar
	const getAvatar = async () => {
    await axios.get(req.body.developer.github)
        .then(res => {
            const $ = cheerio.load(res.data)
            const profileImgLoad = $(".avatar.avatar-user.width-full")
            avatar = profileImgLoad[0].attribs.src
            console.log('av', avatar)
            console.log(profileImgLoad.attribs)
        })
	}
	getAvatar()
		.then(() => {
			console.log('getavatar then', avatar)
			req.body.developer.avatar = avatar
			console.log('reqbody with avatar\n', req.body)
			console.log('req.body.developer before create\n', req.body.developer)
			Developer.create(req.body.developer)
				.then((developer) => {
					res.status(201).json({ developer: developer.toObject() })
				})
				.catch(next)
				})
		.catch(err => {
			console.log(err)
		})
	
})

//Add project to dev
//Patch /developer/addProj/:projectId
router.patch('/developers/addProj/:projectId', requireToken, removeBlanks, (req, res, next) => {
	console.log('Are we even hitting this???=======>>>>>')
	//delete req.body.developer.owner
	console.log('Project ID in backend\n', req.params.projectId, )
	console.log('req.body', req.body)
	req.body.developers.forEach(devId => {
		Developer.findById(devId)
			.then(handle404)
			.then((developer) => {
				developer.projects.push(req.params.projectId)
				console.log('DEVELOPER in backend', developer)
				return developer.save()
			})
			.then(() => res.sendStatus(204))
			.catch(next)	
	})
})

//UPDATE remove project from developer
//Patch /developer/delProj/:projectId
router.patch('/developers/delProj/:projectId', requireToken, removeBlanks, (req, res, next) => {
	console.log('Are we even hitting this???=======>>>>>')
	//delete req.body.developer.owner
	console.log('Project ID in backend\n', req.params.projectId, )
	console.log('req.body', req.body)
	req.body.developers.forEach(devId => {
		Developer.findById(devId)
		.then(handle404)
		.then((developer) => {
			requireOwnership(req, developer)
			let removeProject
			developer.projects.forEach((project, i) => {
				if (project === req.params.projectId) {
					return removeProject = i
				}
			})
			developer.projects.splice(removeProject, 1)
			console.log('DEVELOPER in backend', developer)
			return developer.save()
		})
		.then(() => res.sendStatus(204))
		.catch(next)		
	})	
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

// router.get("/developers/getProfilePic/:id", (req, res, next) => {
// 	Developer.findById(req.params.id)
// 		.then(handle404)
// 		.then((developer) => {
// 			let avatar
// 			request(developer.github, (error, response, html) => {
// 				if (!error && response.statusCode == 200) {
// 				const loadGitPfp = cheerio.load(html);

// 				const profileImgLoad = loadGitPfp(".avatar.avatar-user.width-full");
// 				// console.log(profileImgLoad)
// 				avatar = profileImgLoad[0].attribs.src
// 				console.log(
// 					"this is the consolelog======>>\n",
// 					profileImgLoad[0].attribs.src
// 				);
// 				}
// 			});
// 			res.status(200).json({ developer: developer.toObject() });
// 			})
// 			developer.avatar = avatar
// 			return developer.save()
// 		.catch(next);
// });


module.exports = router
