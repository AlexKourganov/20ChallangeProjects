const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 3;
let page = 1;

async function getPosts(){
    const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);

    const data = await res.json();
    
    return data;
}

// Show posts in DOM
async function showPosts(){
    
    const posts = await getPosts();
    console.log(posts.results);
     posts.results.forEach(post => {
        const postEl = document.createElement('div');
        const status = post.status === 'Alive' ? 'alive' : (post.status === 'Dead' ? 'dead' : 'unknown');
       


        postEl.classList.add('post');
        postEl.innerHTML = `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.name}</h2>
                <p class="post-body">Status: <span class="${status}">${post.status}</span></p>
                <p class="post-body">Species: ${post.species}</p>
                <p class="post-body">Gender: ${post.gender}</p>
                <p class="post-body">Location: ${post.location.name}</p>
            </div>
            <img src="${post.image}" alt="" class="post-image">
        `;
        postsContainer.appendChild(postEl);
     });
}

function showLoading(){
    loading.classList.add('show');
    setTimeout(()=>{
        loading.classList.remove('show');

        setTimeout(()=>{
            page++;
            showPosts(); 
        },300);


    },1000);
}
// Filter Posts
function filterPosts(e){
    console.log('i am being called')
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');
    posts.forEach(post =>{
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if(title.indexOf(term) > -1 || body.indexOf(term)>-1){
            post.style.display='flex';
        }else{
            post.style.display='none';
        }
    })
}



showPosts();

window.addEventListener('scroll', ()=>{
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

    if(scrollTop + clientHeight >= scrollHeight - 5){
        // Showloader
        showLoading();
    }
});

filter.addEventListener('input',filterPosts);

