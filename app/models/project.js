// const { urlencoded } = require("express")
const mongoose = require("mongoose")
const likeSchema = require('./like')

const { Schema, model } = mongoose

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    tags: [
      {
        type: String,
      },
    ],
    deployment: String,
    img: String,
    front_end_repo: String,
    back_end_repo: String,
    developers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Developer",
      required: false,
    }],
    likes:[],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Project", projectSchema)
