# SC-Housekeeper

Visit [here](https://master.ds0ichmwy7nuy.amplifyapp.com/)

## Table of contents
* [Description](#description) 
* [Tech Stack](#techstack)
* [Features](#features)

## Description

This is a personal project that aims to provide convenience to its user (basically just me).
It will contain some subprojects and currently the first subproject is PantryGuru.

* PantryGuru -> 
Manage pantry/medkit/bathroom could be a mess, especially if you are in a large family. PantryGuru is designed
to solve this problem. This app will help you to manage stuff in your pantry/medkit/etc effectively. 


## Teck Stack

* ReactJS (HTML5 SCSS JavaScript (ES6) )
* React-Redux
* Redux-thunk -> handle async data loading
* ~~Webpack Bable~~ maybe later
* Enzyme/Jest -> testing

* AWS Lambda + RESFful API + DynamoDB -> storage & backend
* Amazon Cognito -> user management



## Features

- [x] User registration
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

## Scenarios

scenario 1: 
Andy gets really busy these days and a pack of pork belly got rotten in his fridge 
(he realize that by the ubiquitous smell).

scenario 2: 
Andy is doing a grocery shopping in coles but forget what he was planning to buy
(have to go there again, damn).
