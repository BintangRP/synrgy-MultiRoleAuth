import { Sequelize } from "sequelize";
import { db } from "../config/db.js";
import { Users } from "./UserModel.js";

const { DataTypes } = Sequelize;

export const Products = db.define('products', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false, //tidak boleh null
        validate: {
            notEmpty: true, // tidak boleh bernilai empty string
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false, //tidak boleh null
        validate: {
            notEmpty: true, // tidak boleh bernilai empty string
            len: [3, 100]
        }
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false, //tidak boleh null
        validate: {
            notEmpty: true, // tidak boleh bernilai empty string
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false, //tidak boleh null
        validate: {
            notEmpty: true, // tidak boleh bernilai empty string
        }
    }
}, {
    freezeTableName: true
});

Users.hasMany(Products);
Products.belongsTo(Users, { foreignKey: 'userId' });