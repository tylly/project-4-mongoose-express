const mongoose = require('mongoose')
const { Schema, model } = mongoose
const developerSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		linkedin: String,
		github: String,
		portfolio: String,
		projects: [{
			type: Schema.Types.ObjectId,
			ref: "Project",
			required: false,
		  }],
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: false,
		},
	},
	{
		timestamps: true,
	}
)
module.exports = model('Developer', developerSchema)