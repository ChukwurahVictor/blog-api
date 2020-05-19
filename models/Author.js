const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
   }]
});

module.exports = mongoose.model('Author', authorSchema);