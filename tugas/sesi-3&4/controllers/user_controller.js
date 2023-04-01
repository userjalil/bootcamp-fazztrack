const { user } = require('../models/index')

const findAllUsers = async (req, res) => {
  try {
    const data = await user.findAll()
    const result = {
      status: 'oke',
      data: data
    }
    res.json(result)
  } catch (error) {
    console.log(error, '<< Error find All Users')
  }
}

const getUsersById = async (req, res) => {
  try {
    const { id } = req.params
    const data = await user.findByPk(id)
    
    if (data === null) {
      return res.status(404).json({
        status: 'failed',
        message: 'data user with ${id} not found',
      })
    }

    res.json({
      status: 'ok',
      data: data
    })
  } catch (error) {
    console.log(error, "<< error find user by id")
  }
}
  const createNewUsers = async (req, res) => {
    try {

      const { firstname, alamat } = req.body
      const newUser = await user.create({ firstname: firstname, alamat: alamat })
      res.status(201).json({
        status: 'ok',
        data: {
          id: newUser.id,
          firstname: newUser.firstname,
          alamat: newUser.alamat,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt
        }
      })
    } catch (error) {
      console.log(error, "<< error created new Users")
    }
  }

  const updateUsers = async (req, res) => {
    try {
      const { id } = req.params
      const {firstname, alamat} = req.body
      const updateuser = await user.findByPk(id)

      if (!updateuser) {
        return res.status(404).json ({
          status: 'failed',
          message: 'data user with ${id} is not exist'
        })
      }
      
      updateuser.firstname = firstname
      updateuser.alamat = alamat

      updateuser.save()

      res.json({
        status: 'ok',
        data: {
          id: updateuser.id,
          firstname: updateuser.firstname,
          alamat: updateuser.alamat,
          createdAt: updateuser.createdAt,
          updatedAt: updateuser.updatedAt
        }
      })
    } catch (error) {
      console.log(error, "<< error update new user")
    }
  }

  const deleteUsers = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await user.destroy({
        where: { id }
      });
  
      if (!deletedUser) {
        return res.status(404).json({
          status: 'failed',
          message: `User with id ${id} not found`
        });
      }
  
      res.json({
        status: 'ok',
        message: `User with id ${id} has been deleted`
      });
    } catch (error) {
      console.log(error, "<< error delete user");
      res.status(500).json({
        status: 'failed',
        message: 'Internal server error'
      });
    }
  };

module.exports = { findAllUsers, getUsersById, createNewUsers, updateUsers, deleteUsers }