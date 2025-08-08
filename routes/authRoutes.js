import { Router } from 'express';
import { userLogin, userRegister } from '../controllers/authController.js';

const router = Router()

//User routes
router.post('/login', userLogin)
router.post('/register', userRegister)

export default router;

