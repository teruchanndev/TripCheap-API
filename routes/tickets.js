const express = require("express");

const checkAuth = require('../middleware/check-auth');
const TicketController = require("../controllers/ticket");

const router = express.Router();

router.post("",
  checkAuth,
  TicketController.createTicket);

router.put("/:id",checkAuth, TicketController.updateTicket);

router.get("", checkAuth,TicketController.getAllTicket);

router.get("/all", TicketController.getAll);

router.get("/city/:city", TicketController.getTicketOfCity);

router.get("/category/:category", TicketController.getTicketOfCategory);

router.get("/search/:search", TicketController.getTicketOfSearch);

router.get("/:id", TicketController.getOneTicket);

router.get("/hightRating/:point", TicketController.getTicketHightRating);

router.delete("/:id", checkAuth, TicketController.deleteOneTicket);

router.put("/update/:id", checkAuth, TicketController.updateTicketQuantity);

router.delete("/list/:id", checkAuth, TicketController.deleteListTicket);

module.exports = router;
