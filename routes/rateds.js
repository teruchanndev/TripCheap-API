const express = require("express");

const RatedController = require('../controllers/rateds');
const checkAuthCustomer = require('../middleware/check-auth-customer');
const router = express.Router();

router.post("", RatedController.createRated);
router.get("/:ticketId", RatedController.getRated);
router.put("/:ticketId", checkAuthCustomer, RatedController.addRatedByUser);
router.put("/delete/:ticketId", checkAuthCustomer, RatedController.deleteRatedByUser);

module.exports = router;
