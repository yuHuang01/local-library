const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { DateTime } = require('luxon');

const AuthorSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    maxLength: 100
  },
  family_name: {
    type: String,
    required: true,
    maxLength: 100 
  },
  date_of_birth: {
    type: Date
  },
  date_of_death: {
    type: Date
  }
});

//Virtual for author's:

//-full name
AuthorSchema.virtual('name').get(function(){
  return this.family_name + ", " + this.first_name;
})
//-lifespan
AuthorSchema.virtual('lifespan').get(function() {
  if(this.date_of_birth != undefined || this.date_of_death != undefined){
    return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
  } else {
    return 'The lifespan of this author can\'t be calculated'
  }

})
//-url
AuthorSchema.virtual('url').get(function() {
  return '/catalog/author/' + this._id;
})
//-date of birth back formatted
AuthorSchema.virtual('date_of_birth_back').get(function() {
  return DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
})
//-date of death back formatted
AuthorSchema.virtual('date_of_death_back').get(function() {
  return (this.date_of_death === undefined)? undefined : DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
})

module.exports = mongoose.model('Author', AuthorSchema)
