import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

const models = [User, File, Appointment];

class Database {
  constructor() {
    /**
     * Inicia conexão com banco de dados MySQL
     */
    this.mySqlInit();

    /**
     * Inicia conexão com banco de dados MongoDB
     */
    this.mongoInit();
  }

  mySqlInit() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map((model) => (model && model.associate && model.associate(this.connection.models)));
  }

  mongoInit() {
    this.mongoConnection = mongoose.connect(
      process.env.MONGO_URL, { useNewUrlParser: true, useFindAndModify: true },
    );
  }
}

export default new Database();
