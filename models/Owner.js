const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class Owner extends Model {
    checkPassword(pass) {
        return bcrypt.compare(pass, this.password);
    }
}

Owner.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            },
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        }
    },
    {
        hooks: {
            async beforeCreate (userData) {
                userData.password = await bcrypt.hash(userData.password, 10)
                return userData;
            }
        },
        sequelize,
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        modelName: 'owner'
    }
)

module.exports = Owner;