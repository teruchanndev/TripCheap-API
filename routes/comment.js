const express = require("express");

const CommentController = require("../controllers/comment");
const checkAuth = require('../middleware/check-auth-customer');

const router = express.Router();

router.get("/:ticketId", CommentController.getCommentOfTicket);
router.post("", checkAuth, CommentController.createComment);
router.put("/:idComment", checkAuth, CommentController.updateIsLike);
router.delete("/:idComment", checkAuth, CommentController.deleteComment);

module.exports = router;