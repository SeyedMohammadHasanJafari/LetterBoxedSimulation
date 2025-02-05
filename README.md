
## Introduction

welcome to LetterBoxd Project!

Yes! this is what we tried to develop in this project!

## What is the main idea of this project?

As we said, it's somthing like LetterBoxd.

so, what is the main idea?

in this project, users can review and rate movies and series.

in addition, they can follow their friends. 

finally, they can see other's review on their profile!


## Main Features

let's talk about Features you access by this project.

first of all, it is neccessary to say that we have two dashboards:

1- Admins dashboard
2- Users dashboard

### now, it better to mention Admins dashboard Features:

1. User Management:

- admins can view user list. 

- admins are able to edit users.

- admins are able to delete users.

2. Manage movies and series:

- admins can add a new movie or series with title, description, genre, release year, poster, Images of the movie.

- admins are able to edit.

- admins can delete content.

3. Manage reviews and ratings:

- admins can view reviews and ratings.

- admins can delete reviews or ratings.

### now, it better to mention Users dashboard Features:

1. Users can sign up.

2. When Users signed up after first time, then Sign in for other times.

3. Users can filter movies based on genre, release year and rating

4. Users have the ability to write reviews and rate movies

5. Users are able follow their friends and see their reviews in thier feed

6. Accessing to all reviews of yourself in In your profile

7. Manage friendships with following and unfollowing other users


## Folders & files Explanation

Below is an explanation of each section:

### Folders:

- middlewares -> This folder is an authentication middleware.

- models ->  Typically stores database models. MongoDB is used, schemas and data models are defined here.

- node_modules ->  Contains installed packages.

- public ->  A folder for public assets such as static files like CSS, images, JavaScript, Font.

- routes -> Contains API routes.

- Sample Data -> contains sample data for testing the project.

- views ->  the pages we need to show.

### Important Files:

- app.js ->  The main application file, where Express.js is initialized, middleware, routes are set up.

- Dockerfile -> Contains Docker configurations to build the application.

## Deployment

To deploy and spread this project in the main directory run

```bash
  node app.js
```
after you run project, wait for some seconds, it shows a message which says:

it is connected to data base on port 5000!

now, you can enjoy project on this url in your web browser:

localhost:5000/pages

important note: the default user role is 'user'. so, if you want to change user role to 'admin' after connection, you have to do this in MongoDB.

in MongoDB, just select the user you signed up and change the user role.

have fun and enjoy project!

sincerely, Seyed Mohammad Hasan Jafari

## github

you can see the project in github by the below url:

https://github.com/SeyedMohammadHasanJafari/LetterBoxedSimulation
