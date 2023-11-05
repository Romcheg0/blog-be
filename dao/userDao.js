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
  async createUser(body) {
    const pool = mysql2.createPool(config)
    const query = "INSERT INTO users (first_name, last_name, date_of_birth, role) VALUES (?, ?, ?, ?)"
    const res = await pool.query(query, Object.values(body))
    pool.end()
    return res
  }
  async updateUserById(body, id) {
    const pool = mysql2.createPool(config)
    const query = 'UPDATE users SET first_name = ?, last_name = ?, date_of_birth = ?, role = ? WHERE id = ?'
    const res = await pool.query(query, [...Object.values(body), id])
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