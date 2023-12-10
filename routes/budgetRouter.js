const router = require('express').Router();

const { default: mongoose } = require('mongoose');
const Budget = require('../model/budgetModel');
const User = require('../model/userModel');

router.get('/', async (req, res, next) => {
    
    try {
        const budget = await Budget.find();
        res.status(200).send(budget);
    } catch(error) {
        console.log(error);
        res.status(502).send({message: "Error while retrieving data", error: error})
    }
});

router.post('/', async (req, res, next) => {
    const {title, budget, month, year, userId} = req.body;

    if(title == "" || budget == "") {
        res.status(400).send({message: "data is invalid"})
    }

    const user = await User.findById(userId);
    if(user) {
        const newBudget = new Budget({
            title: title,
            budget: budget,
            month: month,
            year: year,
            userId: user?._id
        });
    
        const createdBudget = await newBudget.save();
        res.status(201).send(createdBudget);
    }
    else {
        res.status(400).send({message: "User not found"});
    }
});

router.put('/:id', async (req, res, next) => {
   try {
    const id = req.params.id;
    const body = req.body;

    const updatedBudget = await Budget.findByIdAndUpdate(id, body, {new: true});
    res.status(204).send(updatedBudget);
    } catch(error) {
        console.log(error);
        res.status(502).send(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id; 
        const deletedBudget = await Budget.findByIdAndDelete(id);
        res.status(200).send(deletedBudget);
    } catch(error) {
        res.status(502).send({message: "Error while deleting budget", error: error});
        console.log(error);
    }
});

module.exports = router;