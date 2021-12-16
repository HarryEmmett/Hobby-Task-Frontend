# Hobby-Task-Frontend
### Hobby Task - Movie Watchlist

### Harry Emmett

Jira link: https://harryemmett.atlassian.net/jira/software/projects/HTP2/boards/3/roadmap


Git link front-end: https://github.com/HarryEmmett/Hobby-Task-Frontend/network

Git link back-end: https://github.com/HarryEmmett/Hobby-Task-Backend

### Introduction + task outline:

To create a functioning CRUD app using all the methods covered in training the project must use:

Project management - Jira board with the use of smartcommits.

Version control - Code fully intergrated into Git using the feature branch model.

Database - Relation database to persist data as well as a h2 database for testing.

Java and spring back end - Functional application in the OOP language covered.

Front end - Functioning frontend website that communicated with back end.

Testing - Acceptable coverage using MockMVC testing.


### JIRA

I used Jira to create a Scrum board that made use of 4 different epics with each epic having user stories and child issues, which was placed into one four day sprint. This helped me to plan and keep track of my project and using smart commits ensured my board was regularly updated. As seen below:

----------IMAGE------------

### WEBPAGE MOCK AND APPLICATION FLOW

Following my Jira, I created a risk assessment, MoSCoW prioritisation, mock webpage design and a diagram explaining how the application would flow. As seen below:

---------IMAGE-------------------


#### REPOS AND NETWORK GRAPH

From this I then set up two separate repositries one for the front end and one for the backend. These both made use of the feature branch model. As shown below:


----------IMAGE---------------

PACKAGE STRUCTURE DATABASE CONNECTION

Following this I set up my package structure in a way that would make my application easy to follow and I created a relational SQL database to persist my data. I also created a H2 database for testing and these were connect through the application-properties files. As seen below:

The SQL queries I used are included at the bottom of this README.


------------IMAGE------------

### TESTING

Once my Spring application was working correctly and I had confirmed it was working as inteded using Postman. I created some MockMVC tests to test my controller methods, these tests sent rquests to my H2 database to see if the methods were returning the desired results. As seen below:

FRONT END CONNECTION AND DESIGN

To connect my front end and back end I used axios requests to interact with with my API to store data entered on my webpage into my database, for this we used JavaScript. And for the layout and design of my page I used HTML, CSS and the Bootstrap framework. The end result is below:

FINAL PAGE + MODAL POPUP 
![image](https://imgur.com/5JHvLOQ)
![](https://imgur.com/McLknO7)
INITIAL WEBPAGE
[Imgur](https://i.imgur.com/PSBgD7O.png)


### SQL QUERIES

DROP SCHEMA `moviedb`;

CREATE SCHEMA IF NOT EXISTS `moviedb`;
USE `moviedb`;

CREATE TABLE IF NOT EXISTS `movie` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `movie_name` VARCHAR(40) DEFAULT NULL,
    `genre` VARCHAR(40) DEFAULT NULL,
    `year_released`INT(11) DEFAULT NULL,
    `available_on` VARCHAR(40) DEFAULT NULL,
    PRIMARY KEY (`id`)
);
INSERT INTO `moviedb`.`movie`(`movie_name`, `genre`, `year_released`, `available_on`) VALUES ('Lord Of The Rings', 'Adventure', 2001, 'Netflix');
INSERT INTO `moviedb`.`movie`(`movie_name`, `genre`, `year_released`, `available_on`) VALUES ('Superbad', 'Comdey', 2007, 'Netflix');
INSERT INTO `moviedb`.`movie`(`movie_name`, `genre`, `year_released`, `available_on`) VALUES ('Seinfeld', 'Comedy', 1989, 'Netflix');
INSERT INTO `moviedb`.`movie`(`movie_name`, `genre`, `year_released`, `available_on`) VALUES ('Dark', 'Mystery', 2017, 'Netflix');
INSERT INTO `moviedb`.`movie`(`movie_name`, `genre`, `year_released`, `available_on`) VALUES ('Simpsons', 'Comedy', 1989, 'Disney');
INSERT INTO `moviedb`.`movie`(`movie_name`, `genre`, `year_released`, `available_on`) VALUES ('Bladerunner 2049', 'Sci-fi', 2017, 'Amazon');

select*from movie;