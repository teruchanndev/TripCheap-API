const express = require("express");

const RatedController = require('../controllers/rateds');
const checkAuthCustomer = require('../middleware/check-auth-customer');
const router = express.Router();

router.post("", checkAuthCustomer, RatedController.createRated);
router.get("/:ticketId", RatedController.getRated);
router.put("/:idTicket", checkAuthCustomer, RatedController.addRatedByUser);
router.put("/delete/:idTicket", checkAuthCustomer, RatedController.deleteRatedByUser);

module.exports = router;
