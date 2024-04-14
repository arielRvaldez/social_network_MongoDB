const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtsController');    

// /api/thoughts
router.route('/')
    .get(getAllThoughts)
    .get(getThoughtById)
    .post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
    .put(updateThought) 
    .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeReaction);
