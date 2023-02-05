import { Profile } from "../models/profile.js";
import { Quote } from "../models/quote.js";

const create = async (req, res) => {
  try {
      req.body.author = req.user.profile
      const quote = await Quote.create(req.body)
      const profile = await Profile.findByIdAndUpdate(
        req.user.profile,
        { $push: { quotes: quote }},
        { new: true }
      )
      quote.author = profile
      res.status(201).json(quote)
  } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
}

const index = async (req, res) => {
  try {
    const quotes = await Quote.find({})
    .populate('author')
    .sort({ createdAt: 'desc'})
    res.status(200).json(quotes)
} catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const show = async (req,res) => {
  try {
    const quotes = await Quote.findById(req.params.id)
      .populate('author')
      res.status(200).json(quotes)
  } catch (error) {
    res.status(500).json(error)
  }
}

const update = async (req, res) => {
  try {
    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new : true}
    )
    .populate('author')
    res.status(200).json(quote)
  }  catch (error) {
    res.status(500).json(error)
  }
}

const deleteQuote = async (req, res) => {
  try {
    const quote = await Quote.findByIdAndDelete(req.params.id)
    const profile = await Profile.findById(req.user.profile)
    profile.quotes.remove({ _id: req.params.id})
    await profile.save()
    res.status(200).json(quote)
  } catch (error) {
    res.status(500).json(error)
  }
}


export { 
  create,
  index, 
  show,
  update,
  deleteQuote as delete,
}



