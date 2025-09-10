//Populate the select input with the value from the Api getGenres
const populateOptions = (categories) =>{
    const select = document.getElementById('genres');

    for (const category of categories){
        let option = document.createElement("option");
        option.value = category.id;
        option.text = category.name;
        select.appendChild(option);
    }
};
//Return the value and populate the html element.
const getSelectedGenre = () => {
    const selectGenre = document.getElementById('genres').value;
    return selectGenre;
}

//Select a random movie  based on the lenght of the array. 
const getRandomMovie = (movies) =>{
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    return randomMovie;
}

//Start the function with button
const showBtns = () => {
    const btnDiv = document.getElementById('likeOrDislikeBtns');
    btnDiv.removeAttribute('hidden');
}
//If there is a movie, clear the screen first
const clearCurrentMovie = () => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    const movieOverviewDiv = document.getElementById('movieOverview');
    const movieRelaseDiv = document.getElementById('releaseDate');
    const movieCastDiv = document.getElementById('movieCast');


    movieOverviewDiv.innerHTML = '';
    movieRelaseDiv.innerHTML = '';
    moviePosterDiv.innerHTML = '';
    movieTextDiv.innerHTML = '';
    movieCastDiv.innerHTML = '';
}

//Create html elements
const createPoster = (posterPath) =>{
    const posterUrl = `https://image.tmdb.org/t/p/w500/${posterPath}`;
    const posterImg = document.createElement('img');
    posterImg.setAttribute('src', posterUrl);
    posterImg.setAttribute('id', 'moviePoster');
    posterImg.setAttribute('class', 'col-md-4 w-100 h-100 img-fluid rounded')
    return posterImg;
}
const createTitle = (title) =>{
    const titleHeader = document.createElement('h1');
    titleHeader.innerHTML = title;
    titleHeader.setAttribute('id', 'movieTitle');
    titleHeader.setAttribute('class', 'fw-bold display-1 text-center text-white')

    return titleHeader;
}
const createOverview = (overview) => {
    const movieOverview = document.createElement('p');
    movieOverview.innerHTML = overview;
    
    movieOverview.setAttribute('id', 'movieOverview');
    return movieOverview;
}
const createReleaseDate = (release_date) => {
    const releaseDate = document.createElement('h5');
    releaseDate.innerHTML = release_date;
    releaseDate.setAttribute('id', 'movieReleaseDate');
    releaseDate.setAttribute('class', 'text-white p-3');
    
    return releaseDate;
}
const createMovieCast = (cast) => {
    const movieCastDiv = document.getElementById('movieCast');
    const auxiliar = document.createElement('h5');
    auxiliar.innerHTML = 'Cast: ';
    auxiliar.setAttribute('id', 'castText')
    const movieCast = document.createElement('ul');
    movieCast.setAttribute('id', 'castList')
    movieCast.setAttribute('class', 'list-unstyled mb-0 text-start');

    const top10Cast = cast.slice(0, 10);

    for (const actor of top10Cast){
        const movieActor = document.createElement('li');
        movieActor.textContent = `${actor.name} as: ${actor.character}`;
        movieCast.appendChild(movieActor);
    }
    movieCastDiv.appendChild(auxiliar);
    movieCastDiv.appendChild(movieCast);
}
//Display Movie Info

const displayMovie = (movieInfo) => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    const movieOverviewDiv = document.getElementById('movieOverview');
    const movieRelaseDiv = document.getElementById('releaseDate');

    //Create element
    
    
    const movieTitle = createTitle(movieInfo.title);
    const moviePoster = createPoster(movieInfo.poster_path);
    const movieOverview = createOverview(movieInfo.overview);
    const movieRelase = createReleaseDate(movieInfo.release_date);

    //Append to div
    
    movieTextDiv.appendChild(movieTitle);
    moviePosterDiv.appendChild(moviePoster);
    movieOverviewDiv.appendChild(movieOverview);
    movieRelaseDiv.appendChild(movieRelase);

    //Call with the button
    showBtns();

}
