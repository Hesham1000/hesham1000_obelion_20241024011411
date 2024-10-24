```javascript
// todoApp/backend/models/User.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database/connection');
const bcrypt = require('bcrypt');

class User extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, { 
      sequelize, 
      modelName: 'User', 
      tableName: 'Users',
      timestamps: false,
      hooks: {
        beforeCreate: async (user) => {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        },
      },
    });
  }

  async validPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

User.init(sequelize);

module.exports = User;
```