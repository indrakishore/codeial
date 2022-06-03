const express = require('express');

const router = express.Router();

//require post api controller
const postsApi = require("../../../controllers/api/v1/posts_api");

// similar to the post route
router.get('/', postsApi.index);

// Delete through API
router.delete('/:id', postsApi.destroy);

module.exports = router;