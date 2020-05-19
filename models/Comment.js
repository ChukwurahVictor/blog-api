const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
   email: {
      type: String,
      required: true
   },
   comment: {
      type: String,
      required: true
   }
},{
   timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);