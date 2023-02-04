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



export { router }
