const express = require('express');
const router = express.Router();
const ClubSchema = require('../models/Club');
const club = require('../models/Club');


router.get('/', (req, res, next) => {
    club.find().exec().then(docs => {
        res.render('home', { clubs: docs });
    }).catch(err => {
        console.log('Something went wrong while retrieving data from the database', err);
        // handle the error here
    });


});


router.post('/add', (req, res, next) => {
        const book = req.body.book;
        const author = req.body.author;
        const isbn =req.body.isbn;

    console.log(book, author, isbn);

    const uclClub = new ClubSchema({
        book: book,
        author: author,
        isbn: isbn
    });
    uclClub.save()
        .then(() => {
            console.log('Data recorded successfully');
            res.redirect('/');

        })
        .catch((err) => {
            console.log('Something went wrong while saving data to the database', err);
            res.redirect('/');
        });

});


// ROUTE TO UPDATE ELEMENT
router.get('/edit/:id', (req, res, next) => {
    console.log(req.params.id);
    club.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
        .then(docs => {
            res.render('edit', {club: docs});
        })
        .catch(err => {
            console.log('Cannot retrieve data and update it due to database error', err);
        });
});




// ROUTE TO UPDATE element
router.post('/edit/:id', (req, res, next) => {
    console.log(req.params.id);
    club.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
        .then((docs) => {
            console.log("Book updated")
            res.redirect('/');
        })
        .catch((err) => {
            console.log('Something went wrong while updating the data', err);
            next(err);
        });
});

// ROUTE TO DELETE

router.get('/delete/:id', (req, res, next) => {
    club.findByIdAndDelete({_id: req.params.id})
        .then(() => {
            console.log("Congratulations!!! Book deleted successfully");
            res.redirect('/');
        })
        .catch((err) => {
            console.log('Something went wrong while deleting the data', err);
            next(err);
        });
});

module.exports = router;