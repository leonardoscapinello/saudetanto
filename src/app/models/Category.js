import Sequelize, { Model } from 'sequelize';

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
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
