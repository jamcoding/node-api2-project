const express = require('express');

const postsDB = require('../data/db');

const router = express.Router();

router.post("/", (req, res) => {
    const body = req.body;
    if(!body.title || !body.contents) {
        res.status(404).json({ message: "Please provide title and contents for the post." });
    } else {
        postsDB.insert(body)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            message: "There was an error while savingthe post to the database."
          });
        });
    }
})

router.post("/:id/comments", (req, res) => {
    const body = req.body;
    const { id } = req.params;
    postsDB.findById(id);
    if(!id) {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else if (!body) {
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    } else {
        postsDB.insertComment(body)
            .then(comment => {
                res.status(201).json(comment)
            })
            .catch(error => {
                res.status(500).json({ message: "There was an error saving the comment" })
            });
    }
})

router.get('/', (req, res) => {
    postsDB.find(req.query)
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(error => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})

router.get('/:id', (req, res) => {
    postsDB.findById(id.params.id)
        .then(post => {
            if(post) {
                res.status(201).json(post)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})

router.get('/:id/comments', (req, res) => {
    postsDB.findPostComments(req.params.id)
        .then(post => {
            if (post.lenght !== 0) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The comments information could not be retrieved." })
        })
})

router.delete('/:id', (req, res) => {
    postsDB.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json(count)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The post could not be removed" })
        })
})

router.put('/:id', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
      res
        .status(400)
        .json({ message: "Please provide title and    contents for the post." });
    } else {
      db.update(req.params.id, req.body)
        .then(post => {
          res.status(201).json(post);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            message: "There was an error while saving the     post to the database."
          });
        });
    }
})

// router.put('/:id', (req, res) => {

// })

module.exports = router;