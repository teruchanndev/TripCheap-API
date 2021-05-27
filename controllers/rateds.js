const Rated = require("../models/rated");

exports.createRated = (req, res, next) => {
    const rated = new Rated({
        idTicket : req.body.idTicket,
        idCreator : req.body.idCreator,
        countRated : req.body.countRated,
        pointRated: req.body.pointRated,
        listUserRated : req.body.listUserRated
    });
    rated.save().then(createRated => {
        res.status(201).json({
          message: "Rated added successfully",
          rated: createRated
        });
    });
}

exports.getRated = (req, res, next) => {
    Rated.find({ idTicket: req.params.ticketId}).then(documents => {
        res.status(200).json({
            message: "Rated fetched successfully!",
            comment: documents,
            status: true
          });

    }).catch(error => {
        res.status(500).json({
        message: 'Fetching rated failed!',
        status: false
        });
    });
}

exports.addRatedByUser = (req, res, next) => {
    Rated.find({ idTicket: req.params.ticketId}).then(document => {

        document[0].listUserRated.push({
            idUser: req.body.idUser,
            nameUser: req.body.nameUser,
            rating: req.body.rating
        });

        var total = document[0].pointRated * document[0].countRated;
        var totalNew = req.body.rating + total; 
        var countNew = document[0].countRated + 1;
        var pointNew = totalNew / countNew;

        Rated.updateOne({_id: document[0]._id}, 
            { $set:{ 
                pointRated: pointNew, 
                countRated: countNew, 
                listUserRated: document[0].listUserRated 
                } 
            }).then(result => {
                res.status(200).json({ 
                    message: "Update successful!",
                    status: true
                });
            }).catch(error => {
                res.status(500).json({ 
                    message: "Update failed!",
                    status: false
                });
            });
    });
}

exports.deleteRatedByUser = (req, res, next) => {
    Rated.find({ idTicket: req.params.ticketId}).then(document => {
        var removeIndex = document[0].listUserRated.map(function(item) { return item.idUser; }).indexOf(req.body.idUser);
        document[0].listUserRated.splice(removeIndex, 1);

        Rated.updateOne({_id: document[0]._id}, { 
            $set: { listUserRated: document[0].listUserRated } }).then(result => {
                res.status(200).json({ 
                    message: "Delete successful!",
                    status: true
                });
            }).catch(error => {
                res.status(500).json({ 
                    message: "Delete failed!",
                    status: false
                });
            });
    });
}