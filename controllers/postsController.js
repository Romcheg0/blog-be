const PostDao = require('../dao/postDao')
const postDao = new PostDao()

class PostsController {
  async getPosts(req, res) {
    try {
      const [rows, fields] = await postDao.getPosts()
      res.send(rows)
    } catch (e) {
      console.error(e);
      res.sendStatus(500)
    }
  }
  async getPostById(req, res) {
    try {
      const [rows, fields] = await postDao.getPostById(parseInt(req.params.postId))
      res.send(rows)
    } catch (e) {
      console.error(e);
      res.sendStatus(500)
    }
  }
  async getPostByAuthorId(req, res) {
    try {
      const [rows, fields] = await postDao.getPostByAuthorId(parseInt(req.params.authorId))
      res.send(rows)
    } catch (e) {
      console.error(e);
      res.sendStatus(500)
    }
  }
  async updatePostById(req, res) {
    try {
      const [rows, fields] = await postDao.updatePostById(req.body, parseInt(req.params.postId))
      rows.affectedRows === 1
        ? res.sendStatus(201)
        : res.status(400).send({ message: "Bad data" })
    } catch (e) {
      console.error(e);
      res.sendStatus(500)
    }
  }
  async createPost(req, res) {
    try {
      const [rows] = await postDao.createPost(req.body)
      rows.affectedRows === 1
        ? res.sendStatus(201)
        : res.status(400).send({ message: "Bad data" })

    } catch (e) {
      console.error(e);
      res.sendStatus(500)
    }
  }
  async deletePostById(req, res) {
    try {
      const result = await postDao.deletePostById(parseInt(req.params.postId))
      result[0].affectedRows === 1
        ? res.sendStatus(200)
        : res.status(400).send("No rows affected")
    } catch (e) {
      console.error(e);
      res.sendStatus(500)
    }
  }
}

module.exports = PostsController