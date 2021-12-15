"use strict";

const getAllMovies = document.querySelector("#getAllMovies");

//CREATE FUNCTIONALITY
document.querySelector("#createMovie").addEventListener("submit", function (event) {
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
            getAllMovies.innerHTML = "";
            for (let movie of moviesList) {
                const userContainer = document.createElement("div");
                userContainer.classList.add("getAllMovies");

                const movieCard = document.createElement("div");
                movieCard.style = `background-color: red`;
                movieCard.classList.add("card");

                const movieBody = document.createElement("div");
                movieBody.classList.add("card-body");

                const movieName = document.createElement("h3");
                movieName.classList.add("card-title");
                movieName.innerText = movie.movieName;
                // userContainer.appendChild(movieName);
                movieBody.appendChild(movieName);

                const genre = document.createElement("p");
                genre.classList.add("card-text");
                genre.innerText = `Genre: ${movie.genre}`;
                // userContainer.appendChild(genre);
                movieBody.appendChild(genre);
                const yearReleased = document.createElement("p");
                yearReleased.classList.add("card-text");
                yearReleased.innerText = `Released: ${movie.yearReleased}`;
                // userContainer.appendChild(yearReleased);
                movieBody.appendChild(yearReleased);

                const availableOn = document.createElement("p");
                availableOn.classList.add("card-text");
                availableOn.innerText = `Available on: ${movie.availableOn}`;
                // userContainer.appendChild(availableOn);
                movieBody.appendChild(availableOn);

                const deleteMovie = document.createElement("button");
                deleteMovie.innerText = "delete";
                deleteMovie.classList.add("btn", "btn-light");
                deleteMovie.addEventListener("click", () => {
                    axios
                        .delete(`http://localhost:8080/remove/${movie.id}`)
                        .then(response => getMovies())
                        .catch(error => console.log(error))
                });

                const updateMovie = document.createElement("button");
                updateMovie.innerText = "update";
                updateMovie.classList.add("btn", "btn-warning");
                updateMovie.addEventListener("click", () => {
                    openModal();

                    document.querySelector("#modalForm").addEventListener("submit", function (event) {
                        event.preventDefault();

                        const createUpdateForm = this;
                        const movieUpdateData = {
                            movieName: createUpdateForm.updateName.value,
                            genre: createUpdateForm.updateGenre.value,
                            yearReleased: createUpdateForm.updateYearReleased.value,
                            availableOn: createUpdateForm.updateAvailableOn.value,
                        };

                        axios
                            .put(`http://localhost:8080/replace/${movie.id}`, movieUpdateData)
                            .then(response => {
                                console.log(response);
                                getAllMovies.innerHTML = "";
                                getMovies();
                                closeModal();

                            })
                            .catch(error => console.log(error))

                    });

                    // const updateName = prompt("Update name: ");
                    // const updateGenre = prompt("Update genre: ");
                    // const updateYearReleased = prompt("Update year released : ");
                    // const updateavailableOn = prompt("Update available on: ");

                    // const movieUpdateData = {
                    //     movieName: updateName,
                    //     genre: updateGenre,
                    //     yearReleased: updateYearReleased,
                    //     availableOn: updateavailableOn,
                    // };

                    // axios
                    //     .put(`http://localhost:8080/replace/${movie.id}`, movieUpdateData)
                    //     .then(response => {
                    //         getAllMovies.innerHTML = "";
                    //         getMovies();
                    //         console.log(response);
                    //         createMovieForm.reset();
                    //     })
                    //     .catch(error => console.log(error))

                });

                movieBody.appendChild(updateMovie);
                movieBody.appendChild(deleteMovie);
                movieCard.appendChild(movieBody);
                userContainer.appendChild(movieCard);

                console.log(userContainer);

                getAllMovies.appendChild(userContainer);
            }
        })
        .catch(error => console.log(error));

}

//DELTE FUNCTIONALITY
document.querySelector("#deleteMovie").addEventListener("submit", function (event) {
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

// //SEARCH BY GENRE
document.querySelector("#searchGenre").addEventListener("submit", function (event) {
    event.preventDefault();

    const wantedGenre = this;
    const searchGenre = wantedGenre.searchGenre.value;
    axios
        .get(`http://localhost:8080/getByGenre/${searchGenre}`)
        .then(response => {
            const genreList = response.data;
            console.log(genreList);
            getAllMovies.innerHTML = "";
            for (let movieGenre of genreList) {
                const userContainer = document.createElement("div");
                userContainer.classList.add("getAllMovies");

                const genreCard = document.createElement("div");
                genreCard.style = `background-color: red`;
                genreCard.classList.add("card");

                const genreBody = document.createElement("div");
                genreBody.classList.add("card-body");

                const genreName = document.createElement("h3");
                genreName.classList.add("card-title");
                genreName.innerText = movieGenre.movieName;
                genreBody.appendChild(genreName);

                const genre = document.createElement("p");
                genre.classList.add("card-text");
                genre.innerText = `Genre: ${movieGenre.genre}`;
                genreBody.appendChild(genre);

                const yearReleased = document.createElement("p");
                yearReleased.classList.add("card-text");
                yearReleased.innerText = `Released: ${movieGenre.yearReleased}`;
                genreBody.appendChild(yearReleased);

                const availableOn = document.createElement("p");
                availableOn.classList.add("card-text");
                availableOn.innerText = `Available on: ${movieGenre.availableOn}`;
                genreBody.appendChild(availableOn);

                genreCard.appendChild(genreBody);
                userContainer.appendChild(genreCard);
                getAllMovies.appendChild(userContainer);
            }
        })
        .catch(error => console.error(error));


});

//SEARCH PLATFORM
document.querySelectorAll(".push").forEach(button => button.addEventListener("click", ({ }) => {
    const platform = button.id;
    console.log(platform);

    axios
        .get(`http://localhost:8080/availableOn/${platform}`)
        .then(response => {
            const platformOn = response.data;
            console.log(platform);
            getAllMovies.innerHTML = "";
            for (let platform of platformOn) {
                const userContainer = document.createElement("div");
                userContainer.classList.add("getAllMovies");

                const platformCard = document.createElement("div");
                platformCard.style = `background-color: red`;
                platformCard.classList.add("card");

                const platformBody = document.createElement("div");
                platformBody.classList.add("card-body");

                const platformName = document.createElement("h3");
                platformName.classList.add("card-title");
                platformName.innerText = platform.movieName;
                platformBody.appendChild(platformName);

                const genre = document.createElement("p");
                genre.classList.add("card-text");
                genre.innerText = `Genre: ${platform.genre}`;
                platformBody.appendChild(genre);

                const yearReleased = document.createElement("p");
                yearReleased.classList.add("card-text");
                yearReleased.innerText = `Released: ${platform.yearReleased}`;
                platformBody.appendChild(yearReleased);

                const availableOn = document.createElement("p");
                availableOn.classList.add("card-text");
                availableOn.innerText = `Available on: ${platform.availableOn}`;
                platformBody.appendChild(availableOn);

                platformCard.appendChild(platformBody);
                userContainer.appendChild(platformCard);
                getAllMovies.appendChild(userContainer);
            }
        })
        .catch(error => console.error(error));



}));

function closeModal() {
    const selectModal = document.querySelector(".modal");
    selectModal.style.display = "none";

}

function openModal() {

    const selectModal = document.querySelector(".modal");
    const selectCloseButton = document.querySelector(".btn-close");

    selectModal.style.display = "block";

    selectCloseButton.onclick = function () {
        selectModal.style.display = "none";
    }

    window.onclick = function (closeModal) {
        if (closeModal.target === selectModal) {
            selectModal.style.display = "none";
        }
}
}

getMovies()


//UPDATE FUNCTIONAILITY
// document.querySelector("#updateMovie").addEventListener("submit", function (event) {
//     event.preventDefault();

//     const createUpdateForm = this;

//     const idToUpdate = this;
//     const update = idToUpdate.updateId.value;

//     const movieUpdateData = {
//         movieName: createUpdateForm.movieName.value,
//         genre: createUpdateForm.genre.value,
//         yearReleased: createUpdateForm.yearReleased.value,
//         availableOn: createUpdateForm.availableOn.value,
//     };

//     axios
//         .put(`http://localhost:8080/replace/${update}`, movieUpdateData)
//         .then(response => {
//             getAllMovies.innerHTML = "";
//             getMovies();
//             console.log(response);
//             createMovieForm.reset();
//         })
//         .catch(error => console.log(error))

// });
