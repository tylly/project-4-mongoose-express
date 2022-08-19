require('dotenv').config()
//var fs = require('fs');
const AWS = require ('aws-sdk')
// Create S3 service object
const s3 = new AWS.S3({apiVersion: '2006-03-01'})

// Read the file elsewhere, accept it here
module.exports = function (file) {

    console.log(file.mimetype)
    const uploadParams = {
        Bucket: process.env.BUCKET, 
        Key: Date.now() + '_' + file.originalname, 
        Body: file.buffer,
        ACL: 'public-read',
        ContentType: file.mimetype
    }

    return s3.upload(uploadParams).promise()
}

