async function getMovies(query, page) {
    try {
        const movieData = await fetchSearch(query, page);
        const movies = await combineDetails(movieData);
        return movies;
    } catch (error) {
        console.error("Error in getMovies:", error);
        throw new Error(`Fetching failed: ${error.message}`);
    }
}

async function fetchSearch(query, page = 1) {
    try {
        let response = await fetch(`http://www.omdbapi.com/?apikey=1771482b&s=${query}&page=${page}`);
        if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
        const movieData = await response.json();
        return movieData;
    } catch (error) {
        console.error("Error in fetchSearch:", error);
        throw error;
    }
}

async function fetchMovieDetails(imdbID) {
    try {
        let response = await fetch(`http://www.omdbapi.com/?apikey=1771482b&i=${imdbID}`);
        if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error in fetchMovieDetails:", error);
        throw error;
    }
}

async function combineDetails(movieData) {
    if (movieData || movieData.Search) {

        let detailedMovies;

        if (movieData.Search) {
            detailedMovies = movieData;

            for (let i = 0; i < detailedMovies.Search.length; i++) {

                try {
                    const details = await fetchMovieDetails(detailedMovies.Search[i].imdbID);
                    detailedMovies.Search[i] = { ...detailedMovies.Search[i], ...details };
                } catch (error) {
                    console.error(`Error fetching details`, error);
                }
            }
            console.log(detailedMovies);
            return detailedMovies;
        }
        else {
            detailedMovies = movieData;

            for (let i = 0; i < detailedMovies.length; i++) {

                try {
                    const details = await fetchMovieDetails(detailedMovies[i].imdbID);
                    detailedMovies[i] = { ...detailedMovies[i], ...details };
                } catch (error) {
                    console.error(`Error fetching details`, error);
                }
            }
            console.log("Combining details successful: ", detailedMovies);
            return detailedMovies;

        }
    }
    else {
        console.error("Error in CombineDetails");
        throw error;
    }
}

module.exports = { getMovies };