const { orm } = require("../configs/db")
const { DataTypes } = require("sequelize")

class Categori {
    constructor() {
        this.table = orm.define("categoris", {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name_categori: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        })
    }

    Save(data) {
        return new Promise((resolve, reject) => {
            this.table
                .create(data)
                .then((res) => {
                    resolve(res.toJSON())
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    GetAll() {
        return new Promise((resolve, reject) => {
            this.table
                .findAll({
                    order: [["createdAt", "DESC"]],
                })
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
}

module.exports = new Categori()
