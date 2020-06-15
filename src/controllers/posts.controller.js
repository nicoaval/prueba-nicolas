const notesCtrl = {};

// Models
const Post = require("../models/Post");

notesCtrl.renderNoteForm = (req, res) => {
  res.render("post/nuevo-post");
};

notesCtrl.createNewNote = async (req, res) => {
  const { titulo, contenido } = req.body;
  const errors = [];
  if (!titulo) {
    errors.push({ text: "Por favor ingrese el titulo del post." });
  }
  if (!contenido) {
    errors.push({ text: "Por favor ingrese el contenido del post." });
  }
  if (errors.length > 0) {
    res.render("post/nuevo-post", {
      errors,
      titulo,
      contenido
    });
  } else {
    const newNote = new Post({ titulo, contenido });
    newNote.usuario = req.user.id;
    await newNote.save();
    req.flash("success_msg", "Se agrego el nuevo post");
    res.redirect("/posts");
  }
};

notesCtrl.renderNotes = async (req, res) => {
  const posts = await Post.find({ usuario: req.user.id }).sort({ date: "desc" });
  res.render("post/todos-post", { posts });
};


notesCtrl.deleteNote = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Se elimino con exito el Post");
  res.redirect("/posts");
};

module.exports = notesCtrl;
