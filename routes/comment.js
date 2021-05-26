const express = require("express");

const CommentController = require("../controllers/comment");
const checkAuth = require('../middleware/check-auth-customer');

const router = express.Router();

router.get("/:ticketId", CommentController.getCommentOfTicket);
router.post("", CommentController.createComment);
router.put("/:idComment", CommentController.updateIsLike);

module.exports = router;