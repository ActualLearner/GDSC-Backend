
//function that fetches an object containing a list of movies with some but not all details.

async function fetchMovies() {
    try {
        let response = await fetch(`http://www.omdbapi.com/?apikey=1771482b&s=${query}`);
        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }
        let data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching movies:", error);
        alert("Fetching movies failed. Please try again later.");
        return null;
    }
}


// function that fetches details for a movie by using previously fetched id

async function fetchMovieDetails(imdbID) {
    try {
        let response = await fetch(`http://www.omdbapi.com/?apikey=1771482b&i=${imdbID}`);
        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }
        let data = await response.json();
        return data;
    } catch (error) {
        console.log("Fetching details failed. ", error);
        alert("Fetching details failed. ");
        return null;
    }
}


// function that displays movies using bootstrap cards & grid system and displays details using bootstrap modals

function displayMovies(movies) {

    movies.forEach(movie => {

        let div = document.querySelector("#display-movies");

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

        div.appendChild(movieCard);

        //event listener for displaying movie details using bootstrap modals

        movieCard.querySelector('.card').addEventListener('click', () => {
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
        });

    }); // forEach ends here

    document.getElementById("loader").toggleAttribute("hidden");        // Hide loading after fetching is complete
}



let query;

let form = document.querySelector("#form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    document.getElementById("loader").toggleAttribute("hidden");                //Displays the loading icon

    let div = document.querySelector("#display-movies");
    div.innerHTML = ''; // Clear existing content

    let inputField = document.querySelector("#input-field");
    query = inputField.value;

    const movieData = await fetchMovies();

    if (movieData) {
        let detailedMovies = movieData.Search;
        for (let i = 0; i < detailedMovies.length; i++) {
            const details = await fetchMovieDetails(detailedMovies[i].imdbID);    //fetch movie details for each generated search result
            detailedMovies[i] = { ...detailedMovies[i], ...details };             //merge the movie details with the movie title
        }
        displayMovies(detailedMovies);
    }
    else {
        alert("Network response not ok. ");
    }
});