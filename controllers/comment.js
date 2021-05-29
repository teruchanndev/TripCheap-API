const Comment = require("../models/comment");

exports.createComment = (req, res, next) => {

  const comment = new Comment({
      idUser : req.body.idUser,
      idTicket : req.body.idTicket,
      idCreator : req.body.idCreator,
      username : req.body.username,
      message : req.body.message,
      images : req.body.images,
      likeCount : req.body.likeCount,
      disLikeCount: req.body.disLikeCount,
      listUserLike : req.body.listUserLike,
      listUserDisLike: req.body.listUserDisLike
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

  Comment.find({ _id: req.params.idComment }).then(document => {    
    var likeCount;

    if(req.body.isCheckLike) {
      likeCount = document[0].likeCount + 1;
      document[0].listUserLike.push(req.userData.customerId);
    } else {
      likeCount = document[0].likeCount - 1;
      var removeIndex = document[0].listUserLike.indexOf(req.userData.customerId);
      document[0].listUserLike.splice(removeIndex, 1);
    }
  
    console.log('docs: ', document[0].listUserLike);
    Comment.updateOne({_id: req.params.idComment},  
      {
        $set: { likeCount: likeCount, listUserLike: document[0].listUserLike }, 
      }).then(result => {
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
  })
}

exports.updateIsDisLike = (req, res, next) => {
  Comment.find({ _id: req.params.idComment }).then(document => {
    var disLikeCount = document[0].disLikeCount + 1;
    document[0].listUserDisLike.push(req.userData.customerId);

    console.log('docs: ', document[0].listUserDisLike);
    Comment.updateOne({_id: req.params.idComment},  
      {
        $set: { disLikeCount: disLikeCount, listUserDisLike: document[0].listUserDisLike }, 
      }).then(result => {
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
  })
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


