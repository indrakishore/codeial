const express = require('express');

const router = express.Router();
const passport = require('passport');


//require post api controller
const postsApi = require("../../../controllers/api/v1/posts_api");

// similar to the post route
router.get('/', postsApi.index);
router.delete('/:id', passport.authenticate('jwt', {session: false}), postsApi.destroy);

// Delete through API
router.delete('/:id', postsApi.destroy);

module.exports = router;