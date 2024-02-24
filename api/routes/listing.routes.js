import express from 'express'
import { createListing, getUserListings } from '../controllers/listing.controller.js'
import { deleteListing } from '../controllers/test.controller.js'
import { verifyToken } from '../utils/verifyUser.js'


const router = express.Router()


router.post('/create',verifyToken,createListing)
router.delete('/delete/:id',verifyToken,deleteListing)

export default router