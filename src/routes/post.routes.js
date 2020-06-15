const express = require("express");
const router = express.Router();

// Controller
const {
  renderNoteForm,
  createNewNote,
  renderNotes,
  renderEditForm,
  updateNote,
  deleteNote
} = require("../controllers/posts.controller");

// Helpers
const { isAuthenticated } = require("../helpers/autenticacion");

// New Note
router.get("/post/nuevo", isAuthenticated, renderNoteForm);

router.post("/post/nuevo-post", isAuthenticated, createNewNote);

// Get All Notes
router.get("/posts", isAuthenticated, renderNotes);


// Delete Notes
router.delete("/post/delete/:id", isAuthenticated, deleteNote);

module.exports = router;
