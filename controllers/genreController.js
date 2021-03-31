const Genre = require('../models/genre');
const Book = require('../models/book');

const async = require('async');

const {body, validationResult} = require('express-validator');

// Display list of all Genre.
exports.genre_list = function(req, res) {
    Genre.find({})
        .exec((err, list_genre) => {
            res.render('genre_list', {title: 'Genre List', genre_list: list_genre});
        })
};

// Display detail page for a specific Genre.
exports.genre_detail = function(req, res, next) {
    async.parallel({
        'genre': (callback) => {
            Genre.findById(req.params.id)
                .exec(callback);
        },
        'genre_books': (callback) => {
            Book.find({'genre': req.params.id})
                .exec(callback);
        }
    }, (err, results) => {
        if(err) return async.next(err);

        if(results.genre == null) {
            let err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }

        res.render('genre_detail', {title: 'Genre Detail', genre: results.genre, genre_books: results.genre_books});
    })
};

// Display Genre create form on GET.
exports.genre_create_get = function(req, res) {
    res.render('genre_form', {title: 'Create Genre'});
};

// Handle Genre create on POST.
exports.genre_create_post =[
    //Validate and sanitize the name field 
    body('name', 'Genre name is required').trim().isLength({min: 1}).escape(),
    
    //Process request 
    (req, res, next) => {

        //Extract validation errors
        const errors = validationResult(req);

        const genre = new Genre({
            name: req.body.name
        });

        if(!errors.isEmpty()){
            //There are errors => render the form again with the error message
            res.render('genre_form', {title: 'Create Genre', genre: genre, errors: errors.array()});
            return;
        } else {
            //Data is valid
            //But nedd to check if a genre with the same name already exist
            Genre.findOne({ 'name': req.body.name })
                .exec((error, found_genre) => {
                    if(error) return next(error);
                
                    if(found_genre) {
                        res.redirect(found_genre.url);
                    }
                    else {
                        genre.save((err) => {
                            if(err) return next(err);

                            res.redirect(genre.url);
                        })
                    }
                })
        }
    }
]

// Display Genre delete form on GET.
exports.genre_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST.
exports.genre_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET.
exports.genre_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST.
exports.genre_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};
