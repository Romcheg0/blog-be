const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()


const app = express()
app.use(cors())

const UsersController = require('./controllers/usersController')
const PostsController = require('./controllers/postsController')
const usersController = new UsersController()
const postsController = new PostsController()

app.get('/users', usersController.getUsers)
app.get('/users/:userId', usersController.getUserById)
app.put('/users/:userId', bodyParser.json(), usersController.updateUserById)
app.post('/users', bodyParser.json(), usersController.createUser)
app.delete('/users/:userId', usersController.deleteUserById)

app.get('/posts', postsController.getPosts)
app.get('/posts/:postId', postsController.getPostById)
app.get('/posts/author/:authorId', postsController.getPostByAuthorId)
app.put('/posts/:postId', bodyParser.json(), postsController.updatePostById)
app.post('/posts', bodyParser.json(), postsController.createPost)
app.delete('/posts/:postId', postsController.deletePostById)

app.listen(process.env.PORT || 4001, () => {
  console.log('App listening on ' + process.env.PORT || 4001);
})