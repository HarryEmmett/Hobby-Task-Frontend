"use strict";

const getAllMovies = document.querySelector("#getAllMovies");

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
            getAllMovies.innerHTML = "";
            getMovies();
            console.log(response);
            createMovieForm.reset();
        })
        .catch(error => console.log(error))

});

//READ FUNCTIONALITY
const getMovies = () => {
    axios
        .get("http://localhost:8080/getAll")
        .then(response => {
            console.log(response);
            const moviesList = response.data;
            // getAllMovies.innerHTML = "";
            for(let movie of moviesList) {

                const userContainer = document.createElement("div");
                // movieColumn.classList.add("allMovies");
                // userContainer.classList.add("allMovies");

                // const movieCard = document.createElement("div");
                // movieCard.style = `background-color: red`;
                // movieCard.classList.add("card");

                // const movieBody = document.createElement("div");
                // movieBody.classList.add("card-body");

                const movieName = document.createElement("h3");
                movieName.classList.add("card-title");
                movieName.innerText = movie.movieName;
                userContainer.appendChild(movieName);

                const genre = document.createElement("p");
                genre.classList.add("card-text");
                genre.innerText = `Genre: ${movie.genre}`;
                userContainer.appendChild(genre);
                
                const yearReleased = document.createElement("p");
                yearReleased.classList.add("card-text");
                yearReleased.innerText = `Released: ${movie.yearReleased}`;
                userContainer.appendChild(yearReleased);

                const availableOn = document.createElement("p");
                availableOn.classList.add("card-text");
                availableOn.innerText = `Available on: ${movie.availableOn}`;
                userContainer.appendChild(availableOn);

                // // movieCard.appendChild(movieBody);
                // userContainer.appendChild(movieCard);

                console.log(userContainer);

                getAllMovies.appendChild(userContainer);
        

            
           }
    })
    .catch(error => console.log(error))

}

//DELTE FUNCTIONALITY
document.querySelector("#deleteMovie").addEventListener("submit", function(event) {
    event.preventDefault();

    const deleteMovieForm = this;
    const id = deleteMovieForm.movieId.value;

    axios
        .delete(`http://localhost:8080/remove/${id}`)
        .then(response => {
            console.log(response)
            deleteMovieForm.reset();
            getAllMovies.innerHTML = "";
            getMovies();
            

        })
        .catch(error => console.error(error));


});


getMovies()
