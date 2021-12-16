"use strict";

const getAllMovies = document.querySelector("#getAllMovies");
const selectHeader = document.querySelector("#movieCounter");

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
            window.location.reload();
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
            selectHeader.innerHTML = "";

            const howManyMovies = Object.keys(response.data).length;
            const movieCounter = document.createElement("h2");   //DISPLAYS LENGTH OF ARRAY FOR MOVIE LIST LENGTH
            movieCounter.innerText = "My movie watch list! Movie counter: " + howManyMovies;
            selectHeader.appendChild(movieCounter);

            for (let movie of moviesList) {
                const userContainer = document.createElement("div");
                userContainer.classList.add("getAllMovies");

                const movieCard = document.createElement("div");
                movieCard.style = `background-color: slateblue`;
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
                deleteMovie.classList.add("btn", "btn-danger");
                deleteMovie.addEventListener("click", () => {
                    axios
                        .delete(`http://localhost:8080/remove/${movie.id}`)
                        .then(response => {
                            getMovies()
                            window.location.reload();
                        })
                        .catch(error => console.log(error))
                });

                const updateMovie = document.createElement("button");
                updateMovie.innerText = "update";
                updateMovie.classList.add("btn", "btn-info");
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
                                window.location.reload();

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
    .put(`http://localhost:8080/replace/${movie.id}`, movieUpdateData)
        .then(response => {
            const genreList = response.data;
            console.log(genreList);
            getAllMovies.innerHTML = "";
            for (let movieGenre of genreList) {
                const userContainer = document.createElement("div");
                userContainer.classList.add("getAllMovies");

                const genreCard = document.createElement("div");
                genreCard.style = `background-color: hotpink`;
                genreCard.classList.add("card");

                const genreBody = document.createElement("div");
                genreBody.classList.add("card-body");

                const genreName = document.createElement("h3");
                genreName.classList.add("card-text");
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

                wantedGenre.reset();
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
                const platformCard = document.createElement("div");
                if (platform.availableOn === "netflix" || platform.availableOn === "Netflix") {
                    platformCard.style = `background-color: crimson`;
                    platformCard.classList.add("card");
                } else if (platform.availableOn === "amazon" || platform.availableOn === "Amazon") {
                    platformCard.style = `background-color: dodgerblue`;
                    platformCard.classList.add("card");
                } else {
                    platformCard.style = `background-color: teal`;
                    platformCard.classList.add("card");
                }

                const userContainer = document.createElement("div");
                userContainer.classList.add("getAllMovies");

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

//SEARCH BY NAME
document.querySelector("#searchName").addEventListener("submit", function (event) {
    event.preventDefault();

    const wantedName = this;
    const searchName = wantedName.searchName.value;
    
    console.log(searchName);
    axios
        .get(`http://localhost:8080/getByName/${searchName}`)
        .then(response => {
            console.log(response);
            if (response.data === "") {
                getAllMovies.innerHTML = "";
            } else {
                const movieRequest = response.data;
                getAllMovies.innerHTML = "";

                const userContainer = document.createElement("div");
                userContainer.classList.add("getAllMovies");

                const requestedCard = document.createElement("div");
                requestedCard.style = `background-color: purple`;
                requestedCard.classList.add("card");

                const requestedBody = document.createElement("div");
                requestedBody.classList.add("card-body");

                const requestedName = document.createElement("h3");
                requestedName.classList.add("card-text");
                requestedName.innerText = movieRequest.movieName;
                requestedBody.appendChild(requestedName);

                const requestedGenre = document.createElement("p");
                requestedGenre.classList.add("card-text");
                requestedGenre.innerText = `Genre: ${movieRequest.genre}`;
                requestedBody.appendChild(requestedGenre);

                const requestedYearReleased = document.createElement("p");
                requestedYearReleased.classList.add("card-text");
                requestedYearReleased.innerText = `Released: ${movieRequest.yearReleased}`;
                requestedBody.appendChild(requestedYearReleased);

                const requestedAvailableOn = document.createElement("p");
                requestedAvailableOn.classList.add("card-text");
                requestedAvailableOn.innerText = `Available on: ${movieRequest.availableOn}`;
                requestedBody.appendChild(requestedAvailableOn);

                requestedCard.appendChild(requestedBody);
                userContainer.appendChild(requestedCard);
                getAllMovies.appendChild(userContainer);

                wantedName.reset();
            }

        })
        .catch(error => console.error(error));



});

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


//OLD UPDATE FUNCTIONAILITY
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
