import { Profile } from '../models/profile.js'
import { Question } from '../models/question.js'


const create = async (req, res) => {
  try {
      req.body.author = req.user.profile
      const question = await Question.create(req.body)
      const profile = await Profile.findByIdAndUpdate(
        req.user.profile,
        { $push: { questions: question }},
        { new: true }
      )
      question.owner = profile
      res.status(201).json(question)
  } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
}

const index = async (req, res) => {

}


export { 
  create,
  index
}