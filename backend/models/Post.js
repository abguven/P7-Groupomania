'use strict';
const {
  Model, ForeignKeyConstraintError
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, PostLike }) {
      // define association here
      
      // User <=> Post 'one to many' relationship
      this.belongsTo(User, {
        as: "user", // Alias for association
        foreignKey: {
          name: "user_uuid",
          type: DataTypes.UUID,
          allowNull: false
        }
      });
      // Many to Many relation with User through PostLike table
      //this.belongsToMany(User, { through: PostLike });
      this.hasMany(PostLike, { onDelete: "CASCADE" });

    }
  }
  Post.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    post_image_url: {
      type: DataTypes.STRING,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    user_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};