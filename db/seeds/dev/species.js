
const monsterInfo = require('../../../data')

const createMonsters = (knex, monster) => {
  return knex('monsters').insert(monster)
}

const createSpecies = (knex, specie) => {
    return knex('monsterspecies').insert({
      species: specie.speciesName,
      description: specie.description
    }, 'id')
    .then(monstersId => {
      const monstersPromises = []

      specie.monsters.forEach( monster => {
        monstersPromises.push(
          createMonsters(knex, {
            name: monster.name,
            species_id: monstersId[0]
          })
        )
      })
      return Promise.all(monstersPromises)
    })
}

exports.seed = function(knex) {
  return knex('monsters').del()
    .then(() => knex('monsterspecies').del())
    .then(() => {
      let speciesPromises = [];
      monsterInfo.forEach( specie => {
        speciesPromises.push(createSpecies(knex, specie))
      })

      return Promise.all(speciesPromises)
    })
    .catch(error => console.log(`Error seeding data: ${error}`))
};
