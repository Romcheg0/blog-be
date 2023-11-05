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

class PostDao {
  async getPosts() {
    const pool = mysql2.createPool(config)
    const res = await pool.query('SELECT * FROM posts')
    pool.end()
    return res
  }
  async getPostById(id) {
    const pool = mysql2.createPool(config)
    const query = 'SELECT * FROM posts WHERE id = ?'
    const res = await pool.query(query, [id])
    pool.end()
    return res
  }
  async getPostByAuthorId(id) {
    const pool = mysql2.createPool(config)
    const query = 'SELECT * FROM posts WHERE author_id = ?'
    const res = await pool.query(query, [id])
    pool.end()
    return res
  }
  async createPost(body) {
    const pool = mysql2.createPool(config)
    const query = "INSERT INTO posts (title, content, issue_date, author_id) VALUES (?, ?, ?, ?)"
    const res = await pool.query(query, [body.title, body.content, body.issue_date, body.author_id])
    pool.end()
    return res
  }
  async updatePostById(body, id) {
    const pool = mysql2.createPool(config)
    const query = 'UPDATE posts SET title = ?, content = ?, issue_date = ?, author_id = ? WHERE id = ?'
    const res = await pool.query(query, [body.title, body.content, body.issue_date, body.author_id, id])
    pool.end()
    return res
  }
  async deletePostById(id) {
    const pool = mysql2.createPool(config)
    const query = `DELETE FROM posts WHERE id = ?`
    const res = await pool.query(query, [id])
    pool.end()
    return res
  }
}

module.exports = PostDao