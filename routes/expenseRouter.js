const express = require('express');

const router = express.Router();

const expenseController = require('../controller/expense');

router.post('/add-expense',expenseController.postAddExpense);

router.get('/get-expenses',expenseController.getExpenses);

router.delete('/delete-expense/:id',expenseController.postDeleteExpense);

router.put('/edit-expense/:id',expenseController.getEditExpense);

module.exports = router;