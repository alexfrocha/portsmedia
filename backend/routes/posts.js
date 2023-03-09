import express from 'express'
import {
    getFeedPost,
    getUserPosts,
    likePost,
    deletePost
} from '../controllers/posts.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/', verifyToken, getFeedPost)
router.get('/:userId/posts', verifyToken, getUserPosts)
router.delete('/:postId', verifyToken, deletePost)
router.patch('/:id/like', verifyToken, likePost)

export default router