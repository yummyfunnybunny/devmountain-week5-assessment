import { DataTypes, Model } from 'sequelize';
import util from 'util';
import connectToDB from './db.js';

const db = await connectToDB('postgresql://postgres:postgres@localhost:5432/animals');

export class Human extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }

  getFullName() {
    // TODO: Implement this method
    const human = Human.findAll({
      attributes: ['fname', 'lname'],
    });
    console.log(human);
  }
}

Human.init(
  {
    humanId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    fname: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    lname: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize: db,
  }
);

export class Animal extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Animal.init(
  {
    animalId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    species: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    birthYear: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
  }
);

// TODO: Define Relationship
Human.hasMany(Animal, { foreignKey: 'humanId' });
Animal.belongsTo(Human, { foreignKey: 'humanId' });

export default db;
