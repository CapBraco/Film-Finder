//Api key, api url, and Button to use the app
const tmdbKey = 'e6b890d82a1eb376e1f0491bba2eebc4';
const tmdbUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

//Get the genres from the API

const getGenres = async () => {
    const genreRequestEndpoint = '/genre/movie/list';
    const requestParams = `?api_key=${tmdbKey}`
    const urlToFetch = `${tmdbUrl}${genreRequestEndpoint}${requestParams}`;
    
    try{
        const response = await fetch(urlToFetch);
        if(response.ok){
            const jsonResponse = await response.json();
            const genres = jsonResponse.genres;
            return genres;
        }
    }catch(error){
        console.log(error);
    }
}

//Get the movies from the selected genre
const getMovie = async () => {
    const selectGenre = getSelectedGenre();
    const movieRequestEndpoint = '/discover/movie';
    const requestParams = `?api_key=${tmdbKey}&with_genres=${selectGenre}`;
    const urlToFetch = `${tmdbUrl}${movieRequestEndpoint}${requestParams}`;

    try{
        const response = await fetch(urlToFetch);
        if(response.ok){
            const jsonResponse = await response.json();
            const movies = jsonResponse.results;
            return movies;
        }
    }catch(error){
        console.log(error)
    }
}
//Get selected movie info

const getMovieInfo = async (movie) => {
    const movieId = movie.id;
    const movieInfoEndpoint = `/movie/${movieId}`;
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbUrl}${movieInfoEndpoint}${requestParams}`;

    try{
        const response = await fetch(urlToFetch);
        if(response.ok){
            const jsonResponse = await response.json();
            return jsonResponse;
        }
    }catch(error){
        console.log(error)
    }
}
const getMovieCast = async (movie) => {
    const movieId = movie.id;
    const castEndpoint = `/movie/${movieId}/credits`;
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbUrl}${castEndpoint}${requestParams}`;

    try{    
        const response = await fetch(urlToFetch);

        if(response.ok){
            const jsonResponse = await response.json();
            const cast = jsonResponse.cast;
            return cast;
        }
    }catch(error){
        console.log(error);
    }
}
//Show Random Movie
const showRandomMovie = async () => {
    const movieInfo = document.getElementById('movieInfo');

    if (movieInfo.childNodes.length > 0) {
        clearCurrentMovie();
    }

    const movies = await getMovie();
    const randomMovie = getRandomMovie(movies);
    const info = await getMovieInfo(randomMovie);
    const cast = await getMovieCast(randomMovie);

    createMovieCast(cast);

    displayMovie(info);

};
getGenres().then(populateOptions);

playBtn.onclick = showRandomMovie;
