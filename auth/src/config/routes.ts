import express from 'express'
const router = express.Router()
import authControllers from '../app/controllers/authController'
import { runLoginCheck, runRegisterCheck } from '../app/middlewares/validators/authChecks'
import { runValidation } from '../app/middlewares/validators/runValidation'
import authenticateUser from '../app/middlewares/auth/authHeader'
import { authCookie } from '../app/middlewares/auth/authCookie'
import userControllers from '../app/controllers/usersController'

// test
router.get('/',(req,res) => {
    res.json('welcome to typescript server')
})

router.post('/users/register', runRegisterCheck, runValidation, authControllers.register)
router.post('/users/login', runLoginCheck, runValidation, authControllers.login)
router.get('/users/logout', authControllers.logout)
router.get('/users/account', authCookie, userControllers.getCurrentUser)

export default router