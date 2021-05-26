const Comment = require("../models/comment");

exports.getCommentOfTicket = (req, res, next) => {
    Comment.find({idTicket : req.body.idTicket}).then(documents => {
        res.status(200).json({
          message: "Comments fetched successfully!",
          comments: documents
        });
      }).catch(error => {
        res.status(500).json({
          message: 'Fetching comments failed!'
        })
      })
};

exports.createComment = (req, res, next) => {
    const comment = new Comment({
        idUser: req.body.idUser,
        nameUser: req.body.nameUser,
        idTicket: req.body.idTicket,
        idCreator: req.body.idCreator,
        message: req.body.message,
        images: req.body.images,
        rating: req.body.rating,
        likeCount: req.body.likeCount
    });
    
    comment.save().then(createComment => {
    res.status(201).json({
        message: "Comment added successfully",
        comment: {
        ...createComment,
        id: createComment._id
        }
    });
    }).catch(error => {
    res.status(500).json({
        message: 'Creating a comment failed!' + error
    })
    })
}