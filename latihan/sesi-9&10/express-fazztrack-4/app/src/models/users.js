const { orm } = require('../configs/db')
const { DataTypes } = require('sequelize')

class Users {
    constructor() {
        this.table = orm.define('users', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'user'
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
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
                    order: [['createdAt', 'DESC']]
                })
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    getbyUsername(username) {
        return new Promise((resolve, reject) => {
            this.table
                .findAll({
                    order: [['createdAt', 'DESC']],
                    where: {
                        username
                    }
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

module.exports = new Users()
