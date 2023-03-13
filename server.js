const express = require("express");
// require and configure dotenv to load environment variables from a .env file
require("dotenv").config();

// import mongoose library and connect to MongoDB using environment variable MONGO_URI
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Person = require("./Person");
// define a function to create and save a person
const createAndSavePerson = (done) => {
  // create a new person instance
  const person = new Person({
    name: "John",
    age: 35,
    favoriteFoods: ["pizza", "sushi"],
  });

  // save the person to the database
  person.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// create an array of people objects
const arrayOfPeople = [
  { name: "Mary", age: 25, favoriteFoods: ["burrito"] },
  { name: "Bob", age: 30, favoriteFoods: ["burger", "fries"] },
  { name: "Jane", age: 40, favoriteFoods: ["steak", "salad"] },
];

// define a function to create many people at once
const createManyPeople = (arrayOfPeople, done) => {
  // create multiple Person instances using the create method
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err);
    done(null, people);
  });
};

// define a function to find people by name
const findPeopleByName = (personName, done) => {
  // search for people in the database using the find method
  Person.find({ name: personName }, (err, people) => {
    if (err) return console.error(err);
    done(null, people);
  });
};

// define a function to find a person by their favorite food
const findOneByFood = (food, done) => {
  // search for a person in the database using the findOne method
  Person.findOne({ favoriteFoods: food }, (err, person) => {
    if (err) return console.error(err);
    done(null, person);
  });
};

// define a function to find a person by their ID
const findPersonById = (personId, done) => {
  // search for a person in the database using the findById method
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    done(null, person);
  });
};

// define a function to find and update a person's age
const findAndUpdate = (personName, done) => {
  // search for a person and update their age using the findOneAndUpdate method
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    (err, person) => {
      if (err) return console.error(err);
      done(null, person);
    }
  );
};

// define a function to remove a person by their ID
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, person) => {
    if (err) return console.error(err);
    done(null, person);
  });
};
//Remove a person by their name
const removeManyPeople = (done) => {
  Person.remove({ name: "Mary" }, (err, outcome) => {
    if (err) return console.error(err);
    done(null, outcome);
  });
};
//Chain Search Query Helpers
const queryChain = (done) => {
  Person.find({ favoriteFoods: "burrito" })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
};
