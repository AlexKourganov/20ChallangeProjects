const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');


populateUI();






let ticketPrice = +movieSelect.value;

// Save Selected Movie and Price
function setMovieData(movieIndex,moviePrice){
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice);
}

// Update total count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    console.log(seats);
    const seatsIndex = [...selectedSeats].map((seat)=>{
        return [...seats].indexOf(seat)
    })

    // Store in local storage
    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));
    
    // copy selected seats to array
    // map through array
    // return a new array of indexes

    const selectedSeatsCount = selectedSeats.length;
    
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Get Data from Local Storage and poplate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat,index)=>{
            // if its not there indexOf will give -1
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected')
            }
        })
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}



// Movie Select Event
movieSelect.addEventListener('change', (e)=>{
    ticketPrice = +e.target.value;
    // store the selected movie
    setMovieData(e.target.selectedIndex,e.target.value);

    updateSelectedCount();
})

// Seats click event
container.addEventListener('click', (e)=>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
})
// Initial count and total set
updateSelectedCount();

