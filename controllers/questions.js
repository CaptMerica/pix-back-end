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
  try {
    const questions = await Question.find({})
    .populate('owner')
    .sort({ createdAt: 'desc'})
    res.status(200).json(questions)
} catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const show = async (req,res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate('owner')
      .populate('comments.commenter')
      res.status(200).json(question)
  } catch (error) {
    res.status(500).json(error)
  }
}

const update = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new : true}
    )
    .populate('owner')
    res.status(200).json(question)
  }  catch (error) {
    res.status(500).json(error)
  }
}

const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id)
    const profile = await Profile.findById(req.user.profile)
    profile.questions.remove({ _id: req.params.id})
    await profile.save()
    res.status(200).json(question)
  } catch {
    res.status(500).json(error)
  }
}

export { 
  create,
  index, 
  show,
  update,
  deleteQuestion as delete
}