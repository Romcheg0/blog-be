const UserDao = require('../dao/userDao')
const userDao = new UserDao()

class UsersController {
  async getUsers(req, res) {
    try {
      const [rows, fields] = await userDao.getUsers()
      res.send(rows)
    } catch (e) {
      console.error(e);
      res.sendStatus(500)
    }
  }
  async getUserById(req, res) {
    try {
      const [rows, fields] = await userDao.getUserById(parseInt(req.params.userId))
      res.send(rows)
    } catch (e) {
      console.error(e);
      res.sendStatus(500)
    }
  }
  async updateUserById(req, res) {
    try {
      const [rows, fields] = await userDao.updateUserById(req.body, parseInt(req.params.userId))
      rows.affectedRows === 1
        ? res.sendStatus(201)
        : res.status(400).send({ message: "Bad data" })
    } catch (e) {
      console.error(e);
      res.sendStatus(500)
    }
  }
  async createUser(req, res) {
    try {
      const [rows] = await userDao.createUser(req.body)
      rows.affectedRows === 1
        ? res.sendStatus(201)
        : res.status(400).send({ message: "Bad data" })

    } catch (e) {
      console.error(e);
      res.sendStatus(500)
    }
  }
  async deleteUserById(req, res) {
    try {
      const result = await userDao.deleteUserById(parseInt(req.params.userId))
      result[0].affectedRows === 1
        ? res.sendStatus(200)
        : res.status(400).send("No rows affected")
    } catch (e) {
      console.error(e);
      res.sendStatus(500)
    }
  }
}

module.exports = UsersController