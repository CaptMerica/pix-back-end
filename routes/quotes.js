import { Router } from "express";
import * as quotesCtrl from '../controllers/quotes.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/

router.get('/', quotesCtrl.index)
router.get('/:id', quotesCtrl.show)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, quotesCtrl.create)
router.put('/:id', checkAuth, quotesCtrl.update)
router.delete('/:id', checkAuth, quotesCtrl.delete)

export { router }
