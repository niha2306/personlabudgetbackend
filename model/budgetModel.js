const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const budgetSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  budget: {
    type: mongoose.Types.Decimal128,
    required: true
  },
});

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;
