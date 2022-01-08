const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    // return Recipe.deleteMany()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

Recipe.create({
  title: 'Cake',
  level: 'Amateur Chef',
  ingredients: ['flour', 'eggs', 'milk', 'baking-powder', 'apples', 'sugar'],
  cuisine: 'American',
  dishType: 'dessert',
  duration: 50,
  creator: 'Viktorija'
})
  .then(recipe => {
    console.log(recipe.title)
  })
  .catch(error => console.log('error occured while adding a recipe', error))


Recipe.insertMany(data)
  .then(allRecipes => {
    allRecipes.forEach(recipe => console.log(recipe.title, recipe.duration))
  })
  .catch(error => {
    console.log('error while adding many recipes', error)
  })

Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
  .then(() => {
    console.log('Success changing duration!')
  })
 
  .catch(error => {
    console.log('error while changing the duration', error)
  })

Recipe.deleteOne({ title: "Carrot Cake" })
  .then(() => {
    console.log("Recipe successfully deleted!");
  })
 


