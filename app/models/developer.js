const mongoose = require('mongoose')

const developerSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		linkedin: String,
		github: String,
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: false,
		},
	},
	{
		timestamps: true,
	}
)
module.exports = mongoose.model('Developer', developerSchema)