import { Op } from 'sequelize';
import { Animal, Human } from './model.js';

// Get the human with the primary key 2
export const query1 = await Human.findByPk(2);

// Get the first animal whose species is "fish"
export const query2 = await Animal.findOne({ where: { species: 'fish' } });

// Get all animals belonging to the human with primary key 5
const getHuman5Animals = async function () {
  const human = await Human.findByPk(5);
  const animals = await human.getAnimals();
  return animals;
};
export const query3 = await getHuman5Animals();

// Get all animals born in a year greater than (but not equal to) 2015.
export const query4 = await Animal.findAll({
  where: {
    birthYear: {
      [Op.gt]: 2015,
    },
  },
});

// Get all the humans with first names that start with "J"
export const query5 = await Human.findAll({
  where: {
    fname: {
      [Op.startsWith]: 'J',
    },
  },
});

// Get all the animals who don't have a birth year
export const query6 = await Animal.findAll({
  where: {
    birthYear: {
      [Op.is]: null,
    },
  },
});

// Get all the animals with species "fish" OR "rabbit"
export const query7 = await Animal.findAll({
  where: {
    species: {
      [Op.in]: ['fish', 'rabbit'],
    },
  },
});

// Get all the humans who DON'T have an email address that contains "gmail"
export const query8 = await Human.findAll({
  where: {
    email: {
      [Op.notILike]: '%gmail.com',
    },
  },
});

// Continue reading the instructions before you move on!

// Print a directory of humans and their animals
export async function printHumansAndAnimals() {
  // RETURNS ONE HUGE STRING - CORRECT
  const humans = await Human.findAll({ include: Animal });

  humans.forEach((human) => {
    console.log(`${human.fname} ${human.lname}`);

    human.Animals.forEach((animal) => {
      console.log(`- ${animal.name}, ${animal.species}`);
    });
  });

  // RETURNS AN ARRAY OF OBJECTS - INCORREECT
  // const humans = await Human.findAll({ include: Animal });
  // const directory = humans.map((human, idx) => {
  //   const humanDir = {
  //     name: `${human.fname} ${human.lname}`,
  //     animals: [],
  //   };
  //   humans[idx].Animals.forEach((animal) => {
  //     humanDir.animals.push(animal.name);
  //   });
  //   return humanDir;
  // });
  // return directory;

  // ==================================
}

console.log(printHumansAndAnimals());

// Return a Set containing the full names of all humans
// with animals of the given species.
export async function getHumansByAnimalSpecies(species) {
  // create the set to fill below
  const humanSet = new Set();

  // fetch all humans from the human db
  const humanList = await Human.findAll({ include: Animal });

  // iterate through humans
  humanList.forEach((human) => {
    // iterate through animal list for each human
    human.Animals.forEach((animal) => {
      // if the human has an animal matching the input, add them to the set
      if (animal.species === species) {
        humanSet.add(`${human.fname} ${human.lname}`);
      }
    });
  });

  // return the completed set
  return humanSet;
}

console.log(await getHumansByAnimalSpecies('cat'));
