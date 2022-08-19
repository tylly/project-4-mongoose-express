const { urlencoded } = require("express")
const mongoose = require("mongoose")

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
