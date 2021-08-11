const User = require('../users/users-model.js');
// const Posts = require('../posts/posts-model.js');

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(req.method, req.url, req.timestamp);
  next();
}

const validateUserId = async (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;
  try {
    const user = await User.getById(id);
    if (!user) {
      return res.status(404).send({
        message: `User not found with id: ${id}`
      });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(500).json({message: "Error receiving user"});
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if(!req.body.name) {
    return res.status(400).json({
      message: 'Name is required'
    });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if(!req.body.text) {
    return res.status(400).json({
      message: 'Post text is required'
    });
  } else {
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
};