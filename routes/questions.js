import { Router } from "express";
import * as questionsCtrl from '../controllers/questions.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'


const router = Router()

/*---------- Public Routes ----------*/

router.get('/', questionsCtrl.index)
router.get('/:id', questionsCtrl.show)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, questionsCtrl.create)
router.put('/:id', checkAuth, questionsCtrl.update)
router.delete('/:id', checkAuth, questionsCtrl.delete)

router.post('/:id/comments', checkAuth, questionsCtrl.createComment)
router.put('/:questionId/comments/:commentId', checkAuth, questionsCtrl.updateComment)
router.delete('/:questionId/comments/:commentId', checkAuth, questionsCtrl.deleteComment)

export { router }
