const Comment = require("../models/comment");

exports.createComment = (req, res, next) => {

    const comment = new Comment({
        idUser : req.body.idUser,
        idTicket : req.body.idTicket,
        idCreator : req.body.idCreator,
        username : req.body.username,
        message : req.body.message,
        images : req.body.images,
        rating : req.body.rating,
        likeCount : req.body.likeCount,
        isMyLike: req.body.isMyLike
    });
    comment.save().then(createComment => {
      res.status(201).json({
        message: "Comment added successfully",
        comment: createComment
      });
    });
}

exports.getCommentOfTicket = (req, res, next) => {

    Comment.find({idTicket: req.params.ticketId}).then(documents => {
        res.status(200).json({
          message: "Comments fetched successfully!",
          comment: documents
        });
      }).catch(error => {
        res.status(500).json({
          message: 'Fetching comments failed!'
        })
    });
}

exports.updateIsLike = (req, res, next) => {

  Comment.updateOne({_id: req.params.idComment},  
    { $set: { likeCount: req.body.likeCount, isMyLike: req.body.isMyLike } })
  .then(result => {
    res.status(200).json(
      { 
        message: "Update successful!",
        status: true
      });
  }).catch(error => {
    res.status(500).json(
      {
        message: error,
        status: false,
      });
    }
  );
}

exports.deleteComment = (req, res, next) => {

  Comment.deleteOne({ _id: req.params.idComment}).then(
  result => {
    if(result.n > 0) {
      res.status(200).json({ 
        message: "comment deleted success!",
        status: true
      });
    } else {
      res.status(401).json({ 
        message: "Not authorized!",
        status: false 
      });
    }
  }).catch(error => {
    res.status(500).json({
      message: 'Delete comment failed!',
      status: false
    })
  })
}


