import Sequelize, { Model } from 'sequelize';

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        id: Sequelize.INTEGER,
        category_name: Sequelize.TEXT,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Category;
