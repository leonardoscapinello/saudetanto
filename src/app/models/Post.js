import Sequelize, { Model } from 'sequelize';

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        id: Sequelize.INTEGER,
        id_category: Sequelize.INTEGER,
        title: Sequelize.STRING,
        content: Sequelize.TEXT,
        author: Sequelize.STRING,
        keywords: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Post;
