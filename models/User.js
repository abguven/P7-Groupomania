'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post, PostLike }) {
      // User <=> Post 'one to many' relationship
      this.hasMany(Post, {
        foreignKey: {
          name: "user_uuid",
          type: DataTypes.UUID,
          allowNull: false
        }
      })
      // Many to Many relation with User through PostLike table
      //this.belongsToMany(Post, { through: PostLike });
      this.hasMany(PostLike);
    }

    toJSON() {
      // filter returning password of the user in any case
      return { ...this.get(), password: "hidden" } // TODO: password: null
    }
  }
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(prmPassword) {
        // hash password
        const salt = bcrypt.genSaltSync();
        this.setDataValue('password', bcrypt.hashSync(prmPassword, salt));
      }
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: DataTypes.STRING,
    avatar_url: DataTypes.STRING,
    role: {
      type: DataTypes.STRING,
      defaultValue: "user", // set this value to 'admin' to have priviledged access
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};