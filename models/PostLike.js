'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostLike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PostLike.init({
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.UUID,
      allowNull: false,
    }
  }, {
    timestamps: false,
    modelName: 'PostLike',
    sequelize,    
  });
  return PostLike;
};