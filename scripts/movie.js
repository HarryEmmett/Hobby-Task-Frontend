"use strict";

//CREATE FUNCTIONALITY
document.querySelector("#createMovie").addEventListener("submit", function(event) {
    event.preventDefault();

    const createMovieForm = this;

    const movieData = {
        movieName: createMovieForm.movieName.value,
        genre: createMovieForm.genre.value,
        yearReleased: createMovieForm.yearReleased.value,
        availableOn: createMovieForm.availableOn.value,
    };

    axios
        .post("http://localhost:8080/createMovie", movieData)
        .then(response => {
            console.log(response);
            createMovieForm.reset();
            createMovieForm.name.focus();
        })
        .catch(error => console.log(error))

});