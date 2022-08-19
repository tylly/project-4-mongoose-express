const express = require('express')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer( { storage })
const Upload = require('../models/upload')
const router = express.Router()
const s3Upload = require ('../../s3_upload')

// UPLOAD route - uploads the target file
router.post('/uploads', upload.single('upload'), (req, res, next) => {
    s3Upload(req.file)
        .then(awsFile => {
            console.log('AWS FILE=======>>', awsFile)
            return Upload.create({ url: awsFile.Location })   
        })
		.then(uploadDoc => {
			res.status(201).json({ upload: uploadDoc })
		})
		.catch(next)
})

module.exports = router