
//add-expense
function expenseDetails(event){
  event.preventDefault();

  const amount = event.target.amount.value;
  const description = event.target.description.value;
  const category = event.target.category.value;

  const obj = {
    amount: amount,
    description: description,
    category: category
  };

  axios.post("http://localhost:3000/expense/add-expense",obj)
  .then((response) => {
    showOnScreen(response.data.newExpenseDetails);
   })
  .catch((err) => {
    document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong </h4>";
    console.log(err);
  })
}


//get expense
window.addEventListener("DOMContentLoaded",(event) => {
  event.preventDefault();

  axios.get("http://localhost:3000/expense/get-expenses")
  .then((response) => {
    //console.log(response);
    for(var i=0; i < response.data.allExpenses.length; i++) {
      showOnScreen(response.data.allExpenses[i]);
    }
  })
  .catch((error) => {
    console.log(error);
  })
})

function showOnScreen(user) {

  const parentNode = document.getElementById("listOfUser");

  const childHTML = `<li id=${user.id}> ${user.amount} - ${user.description} - ${user.category} 
    <button style="margin: 5px; padding-left: 7px; padding-right: 7px; color:green; font-weight: bold;" onclick=editUserDetails('${user.description}','${user.amount}','${user.category}','${user.id}')>Edit</button>
    <button style="margin: 7px; padding-left: 7px; padding-right: 5px;  color:red; font-weight: bold;" onclick=deleteUser('${user.id}')>Delete</button><br> </li>`;

  parentNode.innerHTML = parentNode.innerHTML + childHTML;

}


//edit expense
function editUserDetails(description,amount, category, userId) {
  
    document.getElementById("description").value = description;
    document.getElementById("amount").value = amount;
    document.getElementById("category").value = category;

    deleteUser(userId);

}


//delete expense
function deleteUser(userId) {
  axios.delete(`http://localhost:3000/expense/delete-expense/${userId}`)
  .then((response) => {
    removeUserFromScreen(userId);
  })
  .catch((error) => {
    console.log(error);
  })
}


//remove expense
function removeUserFromScreen(userId) {
  const parentNode = document.getElementById("listOfUser");
  const childNodeToBeDeleted = document.getElementById(userId);

  if (childNodeToBeDeleted) {
    parentNode.removeChild(childNodeToBeDeleted);
  }
}
