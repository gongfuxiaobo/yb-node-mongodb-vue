const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  id: {
    type: String,
    unique: true,
    require: true
  },
  userId: {
    type: String
  },
  userName: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  sex: {
    type: Number,
    require: true
  },
  age: {
    type: Number,
    require: true
  },
  address: {
    type: String
  },
  student: {
    type: Number
  },
  status: {
    type: Boolean
  }
}, {
  collection: 'user',
  versionKey: false
})

module.exports = mongoose.model('user', UserSchema)
