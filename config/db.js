import { Sequelize } from "sequelize";

export const db = new Sequelize('ch6_auth_multirole', 'root', '', {
    host: "localhost",
    dialect: "mysql"
})