import mongoose from 'mongoose'

const Schema = mongoose.Schema

const quoteSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Profile' },
  likes: { type: Schema.Types.Array, ref: 'Profile' },
  content: String,
},{
  timestamps: true,
})

const Quote = mongoose.model('Quote', quoteSchema)

export { Quote }