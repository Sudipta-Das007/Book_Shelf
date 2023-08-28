const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ClubSchema = new Schema({
    book: {
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    isbn:{
        type: Number,
        required: true
    }
});

module.exports=mongoose.model('shelf', ClubSchema);