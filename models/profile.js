import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  photo: String,
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  likes: { type: Array, default:[] }
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
