const itemsPerPage = 10;
let pageNumber = 1;
let totalPages;
let query;
let loader = document.querySelector(".loader");
let form = document.querySelector("#form");
let displayDiv = document.querySelector("#display-movies");
let pageDiv = document.querySelector(".pagination");

// Fucntions to display and hide loading symbol

function showLoading() {
    loader.removeAttribute("hidden");
}

function hideLoading() {
    loader.setAttribute("hidden", '');
}

// Pagination function that dynamically displays page buttons and fetches movie data anytime page btn is clicked

function pagination(totalSearchResults) {
    totalPages = Math.ceil(totalSearchResults / itemsPerPage);

    pageDiv.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("a");
        pageButton.href = "#";
        pageButton.innerHTML = `${i}`;
        pageButton.classList.add("page-link");

        pageDiv.appendChild(pageButton);

        // Event listener that fetches movies when a page number is clicked
        pageButton.addEventListener('click', async () => {
            displayDiv.innerHTML = '';
            showLoading();
            pageDiv.setAttribute("hidden", "");

            pageNumber = i;
            try {
                const movies = await fetchMovies(query, pageNumber);
                displayMovies(movies.Search);
                pageDiv.removeAttribute("hidden");

            } catch (err) {
                console.error(`Error fetching page ${i}: `, err);
                displayError(`Error fetching page ${i}`);
            }

        });

    }
}

// Displays an error 

function displayError(error) {
    hideLoading();

    let p = document.createElement("p");
    p.innerHTML = error;
    displayDiv.appendChild(p);
}


function createMovieCard(movie) {
    let movieCard = document.createElement("div");
    movieCard.className = "col-md-4 mb-4";

    movieCard.innerHTML = `
        <div class="card" style="cursor: pointer;">
            <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
            <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
            </div>
        </div>
    `;
    return movieCard;
}


function showMovieDetails(movie) {
    const modalBodyContent = document.getElementById('modal-body-content');
    modalBodyContent.innerHTML = `
                <img src="${movie.Poster}" class="img-fluid mb-3" alt="${movie.Title}">
                <h5>${movie.Title}</h5>
                <p><strong>Release:</strong> ${movie.Released || 'N/A'}</p>
                <p><strong>Genre:</strong> ${movie.Genre || 'N/A'}</p>
                <p><strong>Plot:</strong> ${movie.Plot || 'N/A'}</p>
            `;
    const modal = new bootstrap.Modal(document.getElementById('detailsModal'));
    modal.show();
}

// THis function displays both the movies and movie details
// The movie details are displayed using bootstrap modals, so they are hidden until a movie is clicked on(handled by event listener below)

function displayMovies(movies) {

    movies.forEach(movie => {

        let movieCard = createMovieCard(movie);
        displayDiv.appendChild(movieCard);

        //event listener for displaying movie details using bootstrap modals

        movieCard.querySelector('.card').addEventListener('click', () => {
            showMovieDetails(movie);
        });

    }); // forEach ends here

    hideLoading();        // Hide loading after fetching is complete
}
// displayMovies() definition ends here.

// Function that takes two parameters and fetches movie

async function fetchMovies(input = query, pageNumber) {

    try {
        const url = `/search?query=${encodeURIComponent(input)}&page=${encodeURIComponent(pageNumber)}`;
        const response = await fetch(url, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Server response was not ok');
        }

        const movies = await response.json();
        // console.log(movies);
        return movies;

    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

// Search bar (form) event listener

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    showLoading();

    query = document.querySelector("#input-field").value;
    displayDiv.innerHTML = '';  // Clear existing content including pagination
    pageDiv.innerHTML = "";

    try {

        const movies = await fetchMovies(query, pageNumber);

        if (movies.totalResults) {
            pagination(movies.totalResults);
            displayMovies(movies.Search);
        } else {
            displayMovies(movies);
        }

    } catch (error) {
        console.error('Error fetching movies:', error);
        displayError("Error fetching movies");
    }
});