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

router.get("/search/:search", TicketController.getTicketOfSearch);

router.get("/:id", TicketController.getOneTicket);

router.delete("/:id", checkAuth, TicketController.deleteOneTicket);

module.exports = router;
