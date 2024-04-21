const router = require('express').Router();
const { User, Thought } = require('../../models');
const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtsController');    

// /api/thoughts
router
    .route('/thought')
    .get(getAllThoughts)
    .get(getSingleThought)
    .post(createThought);

// /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .put(updateThought) 
    .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
