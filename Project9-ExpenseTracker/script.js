const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//     {id:1,text:'flower',amount:-20},
//     {id:2,text:'sunny',amount:300},
//     {id:3,text:'books',amount:-25},
//     {id:4,text:'cams',amount:150}
// ];
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));


let transactions = localStorage.getItem('transactions')!== null ? localStorageTransactions : [];



// Add transaction
function addTransaction(e) {
    e.preventDefault();
  
    if (text.value.trim() === '' || amount.value.trim() === '') {
      alert('Please add a text and amount');
    } else {
      const transaction = {
        id: generateID(),
        text: text.value,
        amount: +amount.value
      };
  
      transactions.push(transaction);
  
      addTransactionDOM(transaction);
  
      updateValues();
  
      updateLocalStorage();
  
      text.value = '';
      amount.value = '';
    }
  }

  function generateID() {
    return Math.floor(Math.random() * 100000000);
  }

// Add transactions to DOM list
function addTransactionDOM(transaction){
    // Get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');
    // Add class
    item.classList.add(transaction.amount <0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
  `;
    list.appendChild(item);
}
// Update the balance
function updateValues(){
    const amounts = transactions.map(transaction => transaction.amount);
    
    // Get Total Balance
    const total = amounts.reduce((acc,item)=> (acc += item),0).toFixed(2);

    // Get Income
    const income = amounts.filter((item)=> item>0).reduce((acc,item)=>(acc += item) ,0).toFixed(2);
    // Get Expense
    const expense = (amounts.filter((item)=> item<0).reduce((acc,item)=>(acc += item) ,0)*-1).toFixed(2);
    
    balance.innerText = `$${total}`;
    money_plus.innerText=`$${income}`;
    money_minus.innerText=`$${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
  
    updateLocalStorage();
  
    init();
  }
  // Update local Storage
function updateLocalStorage(){
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init APP
function init(){
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();


form.addEventListener('submit', addTransaction);