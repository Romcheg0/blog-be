const mysql2 = require('mysql2/promise')

const config = {
  host: process.env.HOST,
  user: process.env.DB_USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 10
}

class UserDao {
  async getUsers() {
    const pool = mysql2.createPool(config)
    const res = await pool.query('SELECT * FROM users')
    pool.end()
    return res
  }
  async getUserById(id) {
    const pool = mysql2.createPool(config)
    const query = 'SELECT * FROM users WHERE id = ?'
    const res = await pool.query(query, [id])
    pool.end()
    return res
  }
  async getUserByUsername(username) {
    const pool = mysql2.createPool(config)
    const query = 'SELECT * FROM users WHERE username = ?'
    const res = await pool.query(query, [username])
    pool.end()
    return res
  }
  async authenticate(body) {
    const pool = mysql2.createPool(config)
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?'
    const res = await pool.query(query, [body.username, body.password])
    pool.end()
    return res
  }
  async createUser(body) {
    const pool = mysql2.createPool(config)
    const query = "INSERT INTO users (first_name, last_name, date_of_birth, role, username, password) VALUES (?, ?, ?, ?, ?, ?)"
    const res = await pool.query(query, [body.first_name, body.last_name, body.date_of_birth, body.role, body.username, body.password])
    pool.end()
    return res
  }
  async updateUserById(body, id) {
    const pool = mysql2.createPool(config)
    const query = 'UPDATE users SET first_name = ?, last_name = ?, date_of_birth = ?, role = ?, username = ?, password = ? WHERE id = ?'
    const res = await pool.query(query, [body.first_name, body.last_name, body.date_of_birth, body.role, body.username, body.password, id])
    pool.end()
    return res
  }
  async updateUserPassword(id, password) {
    const pool = mysql2.createPool(config)
    const query = 'UPDATE users SET password = ? WHERE id = ?'
    const res = await pool.query(query, [password, id])
    pool.end()
    return res
  }
  async deleteUserById(id) {
    const pool = mysql2.createPool(config)
    const query = `DELETE FROM users WHERE users.id = ?`
    const res = await pool.query(query, [id])
    pool.end()
    return res
  }
}

module.exports = UserDao