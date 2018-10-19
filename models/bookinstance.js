const mongoose = require('mongoose');
var moment = require('moment');
const Schema = mongoose.Schema;

let BookInstance = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    imprint: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
        default: 'Maintenance'
    },
    due_back: {
        type: Date,
        default: Date.now
    }
});
// Virtual for bookInstance's URL
BookInstance.virtual('url').get(function () {
    return '/catalog/bookinstance/' + this._id;
});
BookInstance
    .virtual('due_back_formatted')
    .get(function () {
        return moment(this.due_back).format('MMMM Do, YYYY');
    });

module.exports = mongoose.model('BookInstance', BookInstance);