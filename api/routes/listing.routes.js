import express from 'express'
import { createListing, getUserListings } from '../controllers/listing.controller.js'
import { verifyToken } from '../utils/verifyUser.js'


const router = express.Router()


router.post('/create',verifyToken,createListing)
export default router