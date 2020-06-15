const { Schema, model } = require("mongoose");

const PostSchema = new Schema(
  {
    titulo: {
      type: String,
      required: true
    },
    contenido: {
      type: String,
      required: true
    },
    usuario: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    imagen:{
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports = model("Post", PostSchema);
