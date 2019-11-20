import Sequelize from 'sequelize';

import Category from '../app/models/Category';
import Post from '../app/models/Post';

import databaseConfig from '../config/database';

const models = [Post, Category];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
