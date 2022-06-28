'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostLike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( { Post, User } ) {
      // define association here
      this.belongsTo(Post);
      this.belongsTo(User);
    }
  }
  PostLike.init({

  }, {
    timestamps: false,
    modelName: 'PostLike',
    sequelize,    
  });
  return PostLike;
};