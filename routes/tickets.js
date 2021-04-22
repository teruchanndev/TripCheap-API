const express = require("express");

const extractFile = require('../middleware/file');
const checkAuth = require('../middleware/check-auth');
const TicketController = require("../controllers/ticket");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});


const router = express.Router();

router.post("",
  checkAuth,
  extractFile,
  TicketController.createTicket);

router.put("/:id",
  checkAuth,
  multer({ storage: storage }).single("image"),
  TicketController.updateTicket);

router.get("", checkAuth, TicketController.getAllTicket);

router.get("/all", TicketController.getAll);

// router.get("/detail/:id", TicketController.getOneTicket);
router.get("/city/:city", TicketController.getTicketOfCity);

router.get("/:id", TicketController.getOneTicket);

router.delete("/:id", checkAuth, TicketController.deleteOneTicket);

module.exports = router;
