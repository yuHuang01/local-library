const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookInsSchema = new Schema({
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
    due_back: {
      type: Date,
      default: Date.now(),
    }
  }
})

BookInsSchema.virtual('url').get(() => {
  return '/catalog/bookinstance/' + this._id;
})

module.exports = mongoose.model('BookInstance', BookInsSchema);
