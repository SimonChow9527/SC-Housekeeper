# SC-Housekeeper

Visit [here](https://pantryguru.simonchow.dev/)


# Currently Under Construction 


## Table of contents
* [Description](#description) 
* [Tech Stack](#techstack)
* [Features](#features)

## Description

This is a personal project that aims to provide convenience to its user (basically just me).

Keep an eye on your inventory could be tedious, especially if you can't resist a sale and love to stock up on things. 
PantryGuru is designed to solve this problem and make managing your inventory enjoyable, so you can keep stocking up. 


## Teck Stack

* ReactJS (HTML5 SCSS JavaScript (ES6) )
* React-Redux
* Redux-thunk -> handle async data loading
* Enzyme/Jest -> testing

* AWS Lambda 
* AWS S3
* AWS API Gateway
* AWS Cognito -> user management



## Features

- [ ] User registration - deprecated
- [x] Create/Edit/Remove Items
- [x] Filter and display Items

## Potential upcoming Features

- [ ] Usage alert 
- [ ] Expire alert 
- [ ] Prepare shopping list
- [ ] Past usage analysis

## Difficulties

* redux state lost on page refresh -> I may start to use redux-presist when state gets more complex.
* react-router give 404 on page refresh -> check [this](https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writing-manually)


