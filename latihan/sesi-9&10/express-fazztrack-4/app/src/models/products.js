const { orm } = require("../configs/db")
const { DataTypes } = require("sequelize")
const categori = require("./categori")

class Products {
    constructor() {
        this.table = orm.define("products", {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name_product: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price_product: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image_product: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            id_categori: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "categoris",
                    key: "id",
                },
            },
        })
        this.table.belongsTo(categori.table, {
            foreignKey: "id_categori",
            as: "categoris",
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
                    include: [{ model: categori.table, as: "categoris" }],
                })
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    console.log(err)
                    reject(err)
                })
        })
    }
}

module.exports = new Products()
