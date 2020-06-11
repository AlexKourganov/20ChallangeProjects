const main = document.getElementById('main');
const totalWealth = document.getElementById('total-wealth');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');


// People Array
let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch Random User and add money
async function getRandomUser(){
   const res = await fetch('https://randomuser.me/api/');
   const data = await res.json();
   
   const user = data.results[0];
   const newUser = {
       name:`${user.name.first} ${user.name.last}`,
       money: Math.floor(Math.random()*1000000)
   }
   addData(newUser);
//    console.log(newUser)
}
// Double Money
function doubleMoney(){
    data = data.map((user)=>{
        return {...user, money: user.money*2}
    });
    updateDOM();
}
function sortByRichest(){
    data.sort((a,b)=>
        b.money - a.money
    );
    updateDOM();
}
function showMillionaires(){
    data = data.filter(user => user.money>1000000);
    updateDOM();
}
function calculateWealth(){
    const total = data.reduce((acc,user) =>(acc += user.money),0);
    totalWealth.innerHTML = ``;
    const wealthElement  =  document.createElement('div');
    
    
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(total)}</strong></h3>`;
    totalWealth.appendChild(wealthElement);
}

function addData(obj){
    data.push(obj);

    updateDOM();
}

function updateDOM(providedData = data){
    // Clear main div
    main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`;

    providedData.forEach((item)=>{
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}





// Format money
function formatMoney(number){
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click',sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);