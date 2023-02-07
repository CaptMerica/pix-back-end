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
  } catch (error) {
    res.status(500).json(error)
  }
}

const createComment = async (req, res) => {
  try {
    req.body.commenter = req.user.profile
    const question = await Question.findById(req.params.id)
    question.comments.push(req.body)
    await question.save()
    const newComment = question.comments[question.comments.length - 1]
    const profile = await Profile.findById(req.user.profile)
    newComment.commenter = profile
    res.status(201).json(newComment)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}



const updateComment = async (req, res) => {
  try {
    const question = await Question.findById(req.params.questionId)
    const comment = question.comments.id(req.params.commentId)
    if (comment.commenter.equals(req.user.profile)) {
      comment.content = req.body.content
      await question.save()
      res.status(200).json(question)
    } else {
      throw new Error('Unauthorized')
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

const deleteComment = async (req, res) => {
  try {
    const question = await Question.findById(req.params.questionId)
    question.comments.remove({_id: req.params.commentId})
    await question.save()
    res.status(200).json(question)
  } catch (err) {
    res.status(500).json(err)
  }
}

export { 
  create,
  index, 
  show,
  update,
  deleteQuestion as delete,
  createComment,
  updateComment,
  deleteComment
}