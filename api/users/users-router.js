const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const Users = require('./users-model');
const Posts = require('../posts/posts-model');

// The middleware functions also need to be required
const { logger, validateUserId, validateUser, validatePost } = require('../middleware/middleware.js');

const router = express.Router();

router.get('/', logger, (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get(req.query)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({message: 'An error occurred'});
    })
  });

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user);
});

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({message: 'Could not create new user'});
    }
  );
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id, req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({message: 'The user could not be updated'});
    }
  );
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.remove(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({message: 'The user could not be deleted'});
    }
  );
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Posts.getById(req.params.id)
    .then((posts) => {
      res.status(200).json (posts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({message: 'There was an error retrieving the users posts'});
    }
  );
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const postInfo = {...req.body, user_id: req.params.id};
  Posts.insert(postInfo)
    .then((post) => {
      res.status(210).json(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({message: 'There was an error creating the new post'});
    }
  );
});

// do not forget to export the router
module.exports = router;