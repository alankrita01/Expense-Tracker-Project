const Expense = require('../models/expenseModel');


//add expense
const postAddExpense = async(req,res,next) => {
  console.log(req.body);

  try{
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;

    const data = await Expense.create({
      amount: amount,
      description: description,
      category: category
    })
    res.status(201).json({newExpenseDetails: data})
  }
  catch(err){
    console.log("error occur in Add-user",JSON.stringify(err));
    res.status(500).json({
      error: err
    })
  }
}


//get Expenses
const getExpenses = async (req,res,next) => {
  try{
    const expenses = await Expense.findAll();
    res.status(200).json({allExpenses : expenses})
  }
  catch(err){
    console.log('Get expense is failing', JSON.stringify(err));
    res.status(500).json({
      error:err
    })
  }
}


//delete expense
const postDeleteExpense = async (req,res,next) => {
  console.log(req.body);
  try{
    
    if(req.params.id == 'undefined'){
        console.log('For Delete, expense id is missing');
        return res.status(400).json({err : 'ID is missing'})
    }
    
    const eId = req.params.id;
    console.log(eId);
    await Expense.destroy({where: {id: eId}});
    res.sendStatus(200);
  }
  catch(err){
    console.log('Delete Expense is Failing', JSON.stringify(err));
    res.status(500).json({
      error:err
    })
  }
}


//edit Expense
const getEditExpense = async (req,res,next) =>{
  try{
    if(req.params.id == 'undefined'){
      console.log('For Delete, expense id is missing');
      return res.status(400).json({err : 'ID is missing'})
    }

    const eId = req.params.id;
    const expense = await Expense.findOne({where : {id: eId}});


    await expense.save();
    res.sendStatus(200).json({expense});
  }
  catch(err){
    console.log('Edit Expense is Failing', JSON.stringify(err));
    res.status(500).json({
      error:err
    })
  }
}


module.exports = {
  postAddExpense,
  getExpenses,
  postDeleteExpense,
  getEditExpense
}