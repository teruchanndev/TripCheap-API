const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("../models/user");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
      .then(hash => {
          const user = new User({
              email: req.body.email,
              username: req.body.username,
              password: hash
          });
          user.save()
              .then(result => {
                  res.status(201).json({
                      message: 'User created!',
                      result: result
                  });
              })
              .catch(err => {
                  res.status(500).json({
                      message: 'Invalid authentication credentials!'
                  });
              });
      });
}

exports.userLogin = (req, res, next) => {
  let fetchUser;
  User.findOne({email: req.body.email})
      .then(user => {
          if(!user) {
              return res.status(401).json({
                  message: 'Auth failed!' + user
              });
          }
          console.log('user check: ' + user);
          fetchUser = user;
          console.log(req.body.password + ' and '+ user.password);
          return bcrypt.compare(req.body.password, user.password);
      })
      .then(result => {
          console.log('result: ' + result);
          if(!result) {
              return res.status(401).json({
                  message: 'Auth failed!' + result
              });
          }
          const token = jwt.sign(
              {email: fetchUser.email, userId: fetchUser._id},
              "secret_this_should_be_longer",
              {expiresIn: '1h'}
          );
          console.log('token: ' + token);

          res.status(200).json({
              token: token,
              expiresIn: 3600,
              userId: fetchUser._id,
              username: fetchUser.username,
              created_at: fetchUser.created_at
          })

      })
      .catch(err => {
          return res.status(401).json({
              message: 'Auth failed!' + err
          });
      });
}

exports.getUsername = (req, res, next) => {
    User.findById(req.params.id).then(user => {
        if (user) {
        res.status(200).json(user);
        } else {
        res.status(404).json({ message: "Username not found!" });
        }
    });
}

exports.getInfoUser = (req, res, next) => {
console.log('res: ' + req.userData.userId);
  User.findById({_id: req.userData.userId})
    .then(documents => {
        if(documents) {
            res.status(200).json(documents);
        } else {
            res.status(404).json({ message: "Not found!" });
        }
  }).catch(error => {
      res.status(500).json({
          message: "Fetching info user failed!"
      })
  })
}

exports.updateInfo = (req, res, next) => {
    // const url = req.protocol + "://" + req.get("host");

    // if(req.files.length >= 2) {
    //     iAvt = url + '/images/' + req.files[0].filename;
    //     iCover = url + '/images/' + req.files[1].filename;
    // } 
    // else if(req.files.length <= 0) {
    //     iAvt = req.body.iAvt;
    //     iCover = req.body.iCover;
    // } else {
    //     if(req.body.iAvt){
    //         iAvt = req.body.iAvt;
    //         iCover = url + '/images/' + req.files[0].filename;
    //     }
    //     if(req.body.iCover){
    //         iAvt = url + '/images/' + req.files[0].filename;
    //         iCover = req.body.iCover;
    //     }
    // }
    const infoUser = new User({
        _id: req.userData.userId,
        nameShop: req.body.nameShop,
        imageAvt: req.body.iAvt,
        imageCover: req.body.iCover,
        desShop: req.body.desShop
    });

    console.log(infoUser);

    User.updateOne(
        { _id: req.userData.userId}, infoUser
    ).then(result => {
        res.status(200).json({
            message: 'Update info successful!',
            userInfo: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Couldn't update info!" + error
          })
    })
}

exports.changePassword = (req, res, next) => {
    bcrypt.hash(req.body, 10)
        .then(hash => {
            User.updateOne({ _id: req.userData.userId}, {password: hash})
                .then(result => 
                    {
                        res.status(200).json({
                            message: 'Change password successfully!',
                            result: result
                        })
                    }).catch(error => {
                        res.status(500).json({
                            message: 'Change password failed!',
                            error: error
                        })
                    });
        });
  }

  exports.deleteAccount = (req, res, next) => {
    // console.log('----------------');
    // console.log('req: ', req.params)
    User.deleteOne({ _id: req.params.id}).then(
        result => {
        if(result.n > 0) {
          res.status(200).json({ message: "Xóa tài khoản thành công!" });
         } else {
          res.status(401).json({ message: "Chưa đăng nhập!" });
         }
      }).catch(error => {
        res.status(500).json({
          message: 'Xóa tài khoản thất bại!'
        })
      })
  }