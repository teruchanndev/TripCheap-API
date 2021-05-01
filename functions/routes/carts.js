const express = require("express");

const CartController = require('../controllers/carts');
const checkAuthCustomer = require('../middleware/check-auth-customer');
const router = express.Router();

//create 1 item cart
router.post("", checkAuthCustomer, CartController.createCart);

//update
router.put("/:id", checkAuthCustomer, CartController.updateCart);

//lấy danh sách cart
router.get("", checkAuthCustomer, CartController.getAllCart);

router.get("/update/:id", checkAuthCustomer, CartController.getOneCart);

router.get("/count", checkAuthCustomer, CartController.getCountCartOfCustomer);

router.get("/cart", checkAuthCustomer, CartController.getCartOfCustomer);

router.get("/pay/:id", checkAuthCustomer, CartController.getCartToPay);

router.delete("/list/:id", checkAuthCustomer, CartController.deleteCart);


module.exports = router;
