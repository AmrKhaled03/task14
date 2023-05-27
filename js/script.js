const API_KEY = 'api_key=a9a00ffebc7105f0a6a9cc68319b0f08';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchUrl = BASE_URL + '/search/movie?' + API_KEY + '&query=';
const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("cards");
const genres = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
];
const tageEl = document.getElementById("tags");

var selectGenre = []; //object of genres

// fifth function to filter cards
setGenres();
function setGenres() {
    tageEl.innerHTML = ""; //set section of tags is empty
    //loop on every genres in our array declared above
    genres.forEach(genre => {
        // create element div and add class tag in css
        const t = document.createElement('div');
        t.classList.add("tag");
        // set tag id = genre id that declared above 
        t.id = genre.id;
        // set tag name = genre name that declared above 
        t.innerHTML = genre.name;
        t.addEventListener('click', () => {
            if (selectGenre.length == 0) {
                // if object is empty , add the input id
                selectGenre.push(genre.id);
            }
            else {
                // if the object has id , loop on all ids in object and = id with genre id and splice idx ,1 or add id
                if (selectGenre.includes(genre.id)) {
                    selectGenre.forEach(id, idx => {
                        if (id == genre.id) {
                            selectGenre.splice(idx, 1);
                        }
                    })

                } else {
                    selectGenre.push(genre.id);
                }
            }
// url of all genres 
            getMovies(API_URL + '&with_genres=' + encodeURI(selectGenre.join(',')));
            // call color function
            highLighted();
        })
        // add the element in section of tags
        tageEl.appendChild(t);
    })
}
// sixth function to add highlight class
function highLighted() {
    const tags = document.querySelectorAll(".tag");
    tags.forEach(tag => {
        tag.classList.remove("highlight");
    })
    clearBtn();
    if (selectGenre.length != 0) {

        selectGenre.forEach(id => {
            const highLightTag = document.getElementById(id);
            highLightTag.classList.add("highlight");
        })
   
    }
      
}
// seventh function to create clear btn
function clearBtn() {
    const clearBtn = document.getElementById("clear");
    if (clearBtn) {
        clearBtn.classList.add("highlight");
    } else {
        let clear = document.createElement("div");
        clear.classList.add("tag" , "highlight");
        clear.id = 'clear';
        clear.innerHTML = 'clear ';
        clear.addEventListener('click', () => {
            selectGenre = [];
            setGenres();
            getMovies(API_URL);
        })
       tageEl.appendChild(clear);
    }

}



// first function to fetch Api
getMovies(API_URL) //call the function 
function getMovies(API_URL) {
    fetch(API_URL).then(res => res.json()).then(data => {
        console.log(data.results);
        if (data.results.length !== 0) {
            showMovies(data.results); //call second function
        }
        else {
            main.innerHTML = `<h1 class="find"> No Results Found</h1>`
        }
// fetch api 

    })
}
// second function to show cards
//parametert is movies (cards)
function showMovies(movies) {
    main.innerHTML = "";  //declare main section 
       movies.forEach(movie => {
        const { poster_path, title, vote_average, overview } = movie;
        // loop of cards and declare every card component
        // create div and add  class card in css
        const movieEl = document.createElement("div");
        movieEl.classList.add("card");
// write every elements in the card
        movieEl.innerHTML = `
    <div class="img">
    <img src="${poster_path ? IMG_URL + poster_path : 'http://via.placeholder.com/1080x1580'}" alt="${title}">
  </div>
  <div class="topic">
    <h4>${title}</h4>
  <span class="${getColor(vote_average)}">${vote_average}</span>
  </div>
  <div class="overview">
  <h1><strong> Overview :</strong></h1> <p>${overview} <p></div>`
//   add the card in main section
        main.appendChild(movieEl);

    });

}
// third function to generate dynamic color vote
function getColor(vote) {
    // if statement on vote rate
    if (vote >= 7) {
        return "green";
    }
    else if (vote >= 5) {
        return "orange";
    }
    else {
        return "red";
    }

}
// fourth function to search in cards
// the form made it for submit and parameter is e
form.addEventListener('submit', (e) => {
    e.preventDefault();  //form parameter
    const searchTerm = search.value; //value = input value
    selectGenre = [];
    setGenres();
    if (searchTerm && searchTerm !== '') {
         
        getMovies(searchUrl + searchTerm); //search film url

    } else {
        getMovies(API_URL); //reload page


    }
})
