const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const mealsEl = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const single_mealEl = document.getElementById('single-meal');


// Search meal and fetch from api
function searchMeal(e){
    e.preventDefault();

    // Clear Single Element
    single_mealEl.innerHTML = '';

    // Get Search Term
    const term = search.value;
    // console.log(term)
    // Check for empty
    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then( res =>  res.json())
        .then(data => {
            console.log(data);
            resultHeading.innerHTML = `<h2>Search Results for '${term}':</h2>`;

            if(data.meals === null){
                resultHeading.innerHTML = `<h2>There are no Search Results try Again!</h2>`;
            }else{
                mealsEl.innerHTML = data.meals.map(meal => `
                    <div class="meal">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                        <div class="meal-info" data-mealID="${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                `).join('');
            }
        });
        // Clear Search Text
        search.value='';

    }else{
        alert('Please Enter a Search Term');
    }

}
// Fetch meal by id
function getMealById(mealID){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data =>{
        const meal = data.meals[0];
        
        addMealToDom(meal);
        scrollToMeal();
        
    });
    
   
    
}
function scrollToMeal(){
    const singleMeal = document.getElementById('single-meal').offsetTop;
    console.log(singleMeal);
    window.scrollTo({ top: singleMeal, behavior: 'smooth'});
}
// Get Random Meal
function getRandomMeal(){
    // Clear Meals and Headings
    mealsEl.innerHTML = '';
    resultHeading.innerHTML='';

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
        const meal=data.meals[0];
        addMealToDom(meal);
    })
}




// Add meal to dom
function addMealToDom(meal){
    const ingredients =[];

    for(let i=1;i<=20;i++){
        if(meal[`strIngredient${i}`]){
            // console.log(meal[`strIngredient${i}`]);
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        }else{
            break;
        }
    }
    single_mealEl.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="single-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
            </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}






// Event Listener
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);

mealsEl.addEventListener('click', e =>{
    const mealInfo = e.path.find(item => {
        if(item.classList){
            return item.classList.contains('meal-info');
        }else{
            return false;
        }
    });
    if(mealInfo){
        const mealID = mealInfo.getAttribute('data-mealid');
        getMealById(mealID);
    }


    
})