const router = require('express').Router();
// const { User, Thought } = require('../../models');
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
    removeThought
} = require('../../controllers/thoughtsController');    

// /api/thoughts
router
    .route('/')
    .get(getThoughts)
    .get(getSingleThought)
    .post(createThought);

// /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought) 
    .delete(deleteThought)
    .delete(removeThought);

// /api/thoughts/:thoughtId/reactions
router.post('/:thoughtId/reactions', addReaction);

router.delete('/:thoughtId/reactions/:reactionId', removeReaction);

module.exports = router;
