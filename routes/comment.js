const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/comment");

router.get('/:ticketId', CommentController.getCommentOfTicket);
router.post('', CommentController.createComment);

module.exports = router;