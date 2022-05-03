const express = require('express');
const res = require('express/lib/response');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

/*app.get("/views/beers.hbs", (req, res) => 
    res.sendFile(__dirname + "/views/checkbeers.hbs")
);

app.get("/views/randombeers.hbs", (req, res) => 
    res.sendFile(__dirname + "/views/randombeers.hbs")
);
*/

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});


app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi =>
      res.render('beers', { beers: beersFromApi }))

    .catch(error => console.log(error))
});

/*punkAPI
  .getRandom()
  .then(responseFromAPI => {
    app.get('/random', (req, res) => {r
      const randomIndex = Math.floor(Math.random() * beersList.length);
      const dataToBeSent = { randomBeers: beersList[randomIndex] };

      res.render('hbs-files/randombeers', dataToBeSent)
  }
*/

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
  .then((randomBeerApi) => {
    res.render('random-beer', {randomBeer: randomBeerApi});
  })
  .catch(error =>{
    console.log(" no random beer", error)
    res.send("we dont have any beers you like")
  })
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));