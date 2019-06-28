const express = require('express')
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json())

app.get('/api/v1/monsterspecies', (request, response) => {
  database('monsterspecies').select()
    .then((monsterspecies) => {
      if(monsterspecies.length) {
        response.status(200).json(monsterspecies);
      } else {
        response.status(404).json({
          error: `Could not get species`
        });
      }
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/monsters', (request, response) => {
  database('monsters').select()
    .then((monsters) => {
      if(monsters.length) {
        response.status(200).json(monsters);
      } else {
        response.status(404).json({
          error: `Could not get monsters`
        });
      }
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/monsterspecies/:id', (request, response) => {
  database('monsterspecies').where('id', request.params.id).select()
    .then((monsterspecies) => {
      if (monsterspecies.length) {
        response.status(200).json(monsterspecies);
      } else {
        response.status(404).json({
          error: `Could not find monsterspecie with id ${request.params.id}`
        });
      }
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/monsters/:id', (request, response) => {
  database('monsters').where('id', request.params.id).select()
    .then((monsters) => {
      if (monsters.length) {
        response.status(200).json(monsters);
      } else {
        response.status(404).json({
          error: `Could not find monster with id ${request.params.id}`
        });
      }
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.listen(PORT, () => {
  console.log(`Our app is running on port ${ PORT }`);
});