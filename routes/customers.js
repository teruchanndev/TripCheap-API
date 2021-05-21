const express = require("express");
const CustomerController = require("../controllers/customers");
const checkAuth = require('../middleware/check-auth-customer');

const router = express.Router();

router.post('/signup', CustomerController.createCustomer);

router.post('/login', CustomerController.customerLogin );

router.get("/info", checkAuth, CustomerController.getInfoCustomer);

router.get("/:id", checkAuth, CustomerController.getInfoCustomerFromManager);

router.put('/info/edit', checkAuth, CustomerController.updateInfo);

router.put('/password', checkAuth, CustomerController.changePassword );

router.delete('/delete/:id', checkAuth, CustomerController.deleteAccount);
module.exports = router;
