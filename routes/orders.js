const express = require("express");

const OrderController = require('../controllers/orders');
const checkAuth = require('../middleware/check-auth');
const checkAuthCustomer = require('../middleware/check-auth-customer');
const extractFile = require('../middleware/file');
const router = express.Router();

//create 1 item cart
router.post("", checkAuthCustomer, extractFile, OrderController.createOrder);

//update
router.put("/:id", checkAuth, extractFile, OrderController.updateOrder);

router.put("/:id/isSuccess", checkAuth, OrderController.updateIsSuccessOrder);

//lấy danh sách cart theo id Customer (client)
router.get("", checkAuthCustomer, OrderController.getAllOrder);
router.get("/manager", checkAuth, OrderController.getOrderOfCreator);

router.get("/:id", checkAuth, OrderController.getOneOrder);

// router.get("/count", checkAuth, OrderController.getCountOrderOfCustomer);

router.get("/order", checkAuth, OrderController.getOrderOfCustomer);



// //lấy danh sách Order theo mảng id cart
// router.get("/pay/:id", checkAuth, OrderController.getOrderToPay);

router.delete("/list/:id", checkAuth, OrderController.deleteOrder);


module.exports = router;
