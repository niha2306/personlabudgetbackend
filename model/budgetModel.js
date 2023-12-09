const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const budgetSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  budget: {
    type: String,
    required: true
  },
  month: {
    type: String,
    required: true
  }
});

const Budget = mongoose.model('PersonalBudget', budgetSchema);

module.exports = Budget;
