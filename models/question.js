import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: String,
  commenter: { type: Schema.Types.ObjectId, ref: 'Profile'}
})

const questionSchema = new Schema({
  title: { type:String, required: true },
  answered: Boolean,
  content: String,
  comments: [commentSchema],
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' }
},{
  timestamps: true,
})

const Question = mongoose.model('Question', questionSchema)

export { Question }