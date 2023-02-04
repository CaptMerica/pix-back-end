import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: String,
  commenter: { type: Schema.Types.ObjectId, ref: 'Profile'},
  likes: { type: Array, default:[] }
})

const questionSchema = new Schema({
  name: { type:String, required: true },
  answered: Boolean,
  content: String,
  comments: [commentSchema],
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' }
},{
  timestamps: true,
})

const Question = mongoose.model('Question', questionSchema)

export { Question }