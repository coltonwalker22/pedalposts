const express = require('express');
const pedalPostRouter = express.Router();
const Post = require('../models/post.js');

pedalPostRouter.get('/', (req, res, next) => {
    Post.find((err, pedalPosts) => {
        if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(pedalPosts)
        })
})


//get posts by user id
pedalPostRouter.get('/user', (req, res, next) => {
    // Post.find( {user: req.auth._id}, (err, posts) => {
    //     if(err){           
    //             res.status(500)
    //             return next(err)
    //         }   
    //         return res.status(200).send(posts)
    // }).populate("User")
    Post.find( {user: req.auth._id}).populate("user", "username").exec( (err, posts) => {
             if(err){           
                     res.status(500)
                     return next(err)
                }   
               return res.status(200).send(posts)
    })
})

//add new post
pedalPostRouter.post('/', (req, res, next) => {
    req.body.user = req.auth._id
    const newPost = new Post(req.body);
    newPost.save((err, savedPost) => {
        if(err) {
            res.status(500);
            return next(err);
        }
        return res.status(201).send(savedPost)
    })
})

//find a post by id
pedalPostRouter.get('/:pedalpostId', (req, res, next) => {
    // Post.findById(req.params.pedalpostId, (err, post) => {
    //     if(err) {
    //         res.status(500);
    //         return next(err)
    //     } else if (!post) {
    //         res.status(404)
    //         return next(new Error("no post found."))
    //     }
    //     return res.send(post);
    // })
    Post.findById(req.params.pedalpostId).populate("user", "-password -email").exec( (err, posts) => {
        if(err){           
                res.status(500)
                return next(err)
           }   
          return res.status(200).send(posts)
})
})

//delete post by the Id
pedalPostRouter.delete("/:pedalpostId", (req, res, next) => {
    Post.findByAndRemove(
        {_id: req.params.pedalpostId, user: req.auth._id},
        (err, post) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.send(post)
        }
    )
})

// update pedalpost
pedalPostRouter.put('/pedalpostId', (req, res, next) => {
    Post.findByIdAndUpdate(
        {_id: req.params.pedalpostId, user: req.auth._id},
        req.body,
        {new: true},
        (err, post) => {
            if (err) {
                console.log("Error")
                res.status(500)
                return next(err)
            }
            return res.send(post)
        }
    )
})

pedalPostRouter.put("/:pedalpostId/upvote", (req, res, next) => {
    Post.findOneAndUpdate(
        {_id: req.params.pedalpostId},
        { $pull: {downVotes: req.auth._id}, $addToSet: {upVotes: req.auth._id}},
        {new: true},
        (err, updatedPedalPost) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(updatedPedalPost)
        }
    );
});

//downvote request
pedalPostRouter.put("/:issueId/downvote", (req, res, next) => {
   Post.findOneAndUpdate(
        {_id: req.params.pedalpostId},
        { $pull: {upVotes: req.auth._id}, $addToSet: {downVotes: req.auth._id}},
        {new: true},
        (err, updatedPedalPost) => {
            if(err){
                res.status(500)
                return next(err)
            }
            console.log(req)
            return res.status(200).send(updatedPedalPost)
        }
    );
});

//delete vote
pedalPostRouter.put("/:pedalpostId/remove", (req, res, next) => {
    Post.findOneAndUpdate(
        {_id: req.params.pedalpostId},
        { $pull: {upVotes: req.auth._id, downVotes: req.auth._id}},
        {new: true},
        (err, updatedPedalPost) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(updatedPedalPost)
        }
    );
});

// add to set, 2 and 1 fuction create http request.
//put request updating model


module.exports = pedalPostRouter