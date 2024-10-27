const { Model, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = new Sequelize('todoApp', 'root', 'root', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});

class User extends Model {
  static init(sequelize) {
    super.init({
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [6, 100]
        }
      }
    }, {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: false
    });

    // Hash password before saving
    this.beforeSave(async (user, options) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    });
  }

  // Method to compare password with the hashed password in the database
  async validatePassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

module.exports = User;
