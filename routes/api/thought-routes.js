const router = require('express').Router();

const {
    addThought,
    getThoughtById,
    UpdateThought,
    removeThought,
    addReaction,
    removeReaction,
    getAllThought
} = require('../../controllers/thought-controller');

router
    .route('/')
    .get(getAllThought)
    .post(addThought);

router
    .route('/:id')
    .get(getThoughtById)
    .put(UpdateThought)
    .delete(removeThought);

router
    .route('/:thoughtId/reactions')
    .post(addReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);


module.exports = router;