const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 100
  },
  familyName: {
    type: String,
    required: true,
    maxLength: 100 
  },
  dateOfBirth: {
    type: Date
  },
  dateOfDeath: {
    type: Date
  }
});

//Virtual for author's:

//-full name
AuthorSchema.virtual('fullName').get(() => {
  return this.familyName + " " + this.firstName;
})
//-lifespan
AuthorSchema.virtual('lifespan').get(() => {
  return (this.dateOfDeath.getYear() - this.dateOfBirth.getYear()).toString();
})
//-url
AuthorSchema.virtual('url').get(() => {
  return '/catalog/author/' + this._id;
})

module.exports = mongoose.model('Author', AuthorSchema)
