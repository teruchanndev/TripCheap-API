const Ticket = require("../models/ticket");

exports.createTicket = (req, res, next) => {
  const ticket = new Ticket({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status,
    price: req.body.price,
    percent: req.body.percent,
    category: req.body.category,
    categoryService: req.body.categoryService,
    price_reduce: req.body.price_reduce,
    city: req.body.city,
    quantity: req.body.quantity,
    services: req.body.services,
    imagePath: req.body.imagePath,
    address: req.body.address,
    creator: req.userData.userId
  });

  ticket.save().then(createTicket => {
    res.status(201).json({
      message: "Ticket added successfully",
      ticket: {
        ...createTicket,
        id: createTicket._id
      }
    });
  }).catch(error => {
    res.status(500).json({
      message: 'Creating a ticket failed!' + error
    })
  })
}

exports.updateTicket  = (req, res, next) => {

  const ticket = new Ticket({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    status: req.body.status,
    price: req.body.price,
    percent: req.body.percent,
    category: req.body.category,
    categoryService: req.body.categoryService,
    price_reduce: req.body.price_reduce,
    city: req.body.city,
    quantity: req.body.quantity,
    imagePath: req.body.imagePath,
    address: req.body.address,
    services: req.body.services
  });

  Ticket.updateOne(
    { _id: req.params.id, creator: req.userData.userId },
    ticket).then(result => {
      if(result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({
          message: "Not authorized!" });
      }

  }).catch(error => {
    res.status(500).json({
      message: "Couldn't update ticket!"
    })
  })
}


exports.getAllTicket = (req, res, next) => {
  Ticket.find({creator: req.userData.userId}).then(documents => {
    res.status(200).json({
      message: "Tickets fetched successfully!",
      ticket: documents
    });
  }).catch(error => {
    res.status(500).json({
      message: 'Fetching tickets failed!'
    })
  })
}

exports.getTicketOfCity = (req, res, next) => {
  console.log(req.params.city);
  arr = req.params.city.split('%20');
  city = arr.join(' ');
  Ticket.find({city: city}).then(documents => {
    res.status(200).json({
      message: "Tickets fetched successfully!" + documents,
      ticket: documents
    });
  }).catch(error => {
    res.status(500).json({
      message: 'Fetching tickets failed!'
    })
  })
}

exports.getTicketOfSearch = (req, res, next) => {
  Ticket.find({title: {$regex: new RegExp(req.params.search, "i") }}).then(documents => {
    res.status(200).json({
      message: "Tickets fetched successfully!" + documents,
      ticket: documents
    });
  }).catch(error => {
    res.status(500).json({
      message: 'Fetching tickets failed!'
    })
  })
}





exports.getAll = (req, res, next) => {
  Ticket.find().then(docs => {
    res.status(200).json({
      message: 'Tickets fetched successfully!',
      ticket: docs });
    }).catch(error => {
      res.status(500).json({
        message: 'Fetching tickets failed!'
      })
  })
}


exports.getOneTicket = (req, res, next) => {

  Ticket.findById(req.params.id).then(ticket => {
    if (ticket) {
      res.status(200).json(ticket);
    } else {
      res.status(404).json({ message: "Ticket not found!" });
    }
  }).catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Fetching ticket failed!'
    })
  })
}


exports.deleteOneTicket = (req, res, next) => {

  Ticket.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(
    result => {
    if(result.n > 0) {
      res.status(200).json({ message: "Xóa vé thành công!" });
     } else {
      res.status(401).json({ message: "Chưa đăng nhập!" });
     }
  }).catch(error => {
    res.status(500).json({
      message: 'Không thể xóa vé!'
    })
  })
}

exports.getTicketOfCategory = (req, res, next) => {
  console.log(req.params.category);
  arr = req.params.category.split('%20');
  category = arr.join(' ');
  Ticket.find({category: category}).then(documents => {
    res.status(200).json({
      message: "Tickets fetched successfully!" + documents,
      ticket: documents
    });
  }).catch(error => {
    res.status(500).json({
      message: 'Fetching tickets failed!'
    })
  })
}

exports.updateTicketQuantity = (req, res, next) => {
  // console.log('---------------------');
  // console.log(req.body);

  Ticket.find({_id: req.params.id}).then(ticket => {
    // console.log('ticket quantity: ', ticket[0].quantity);
    // console.log('quantity: ', req.body.quantity);
    var quantityNew = ticket[0].quantity - req.body.quantity;
    // console.log('quantityNew: ', quantityNew);
    Ticket.updateOne({_id: req.params.id}, {quantity: quantityNew}).then(result => {
      if(result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({
          message: "Not authorized!" });
      }
  }).catch(error => {
    res.status(500).json({
      message: "Couldn't update ticket!"
    });
  });
  });

}


exports.deleteListTicket = (req, res, next) => {
  // console.log('----------------------------------------------------------');
  // console.log(req.params.id);

  arrId = req.params.id.split(',');
  for(let item of arrId) {
    console.log(item);
    Ticket.deleteOne({ _id: item }).then(
    result => {
      if(result.n > 0) {
        res.status(200).json({ message: "Ticket deleted!" });
      } else {
        res.status(401).json({ message: "Not authorized!" + result });
      }
    }).catch(error => {
      res.status(500).json({
        message: 'Delete ticket failed!'
      })
    })
  }
}
