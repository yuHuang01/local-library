const Author = require('../models/author');
const Book = require('../models/book');

const async = require('async');

//Display a list of all author
exports.author_list = (req, res, next) => {
  Author.find()
    .sort([['family_name', 'ascending']])
    .exec((err, list_authors) => {
      if(err) return next(err);

      res.render('author_list', {title: 'Author List', author_list: list_authors});
    })
}

//Display detail page for a specific author
exports.author_detail = (req, res, next) => {
  async.parallel({
    author: (callback) => {
      Author.findById(req.params.id)
        .exec(callback);
    },
    authors_books: (callback) => {
      Book.find({'author': req.params.id}, 'title summary')
        .exec(callback)
    }
  }, (err, results) => {
    if(err) return next(err);

    if(results.author == null) {
      let err = new Error('Author not found');
      err.status = 404;
      return next(err);
    }

    res.render('author_detail', {title: 'Author Deatil', author: results.author, authors_books: results.authors_books});

  })
}

//Display author create form on GET 
exports.author_create_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Author create POST');
}

//Handle author create on POST
exports.author_create_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Author create POST');
}

//Display Author delete form on GET
exports.author_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Author delete GET');
}

//Handle author delete on POST 
exports.author_delete_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Author delete POST');
}

//Display auhtor update form on GET 
exports.author_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Author update GET');
} 


//Handle author update on POST 
exports.author_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Author update POST');
}

