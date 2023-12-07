const router = require('express').Router();

const Budget = require('../model/budgetModel');

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
    const {title, budget} = req.body;

    if(title == "" || budget == "") {
        res.status(400).send({message: "data is invalid"})
    }

    const newBudget = new Budget({
        title: title,
        budget: budget
    });

    const createdBudget = await newBudget.save();
    res.status(201).send(createdUser);
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