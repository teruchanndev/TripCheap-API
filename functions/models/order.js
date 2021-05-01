const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  nameTicket: { type: String },
  imageTicket: { type: String },
  dateStart: { type: String },
  dateEnd: { type: String },
  idTicket: { type: String },
  idCustomer: { type: String },
  idCreator: { type: String },
  itemService: { type: Array },
  payMethod: { type: String },
  status: { type: Boolean },
  isCancel: { type: Boolean },
  isSuccess: { type: Boolean },
  isConfirm: { type: Boolean }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Order', orderSchema);
