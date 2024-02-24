import express from 'express'
import { createListing, updateListing } from '../controllers/listing.controller.js'
import { deleteListing } from '../controllers/test.controller.js'
import { verifyToken } from '../utils/verifyUser.js'


const router = express.Router()


router.post('/create',verifyToken,createListing)
router.delete('/delete/:id',verifyToken,deleteListing)
router.post('/update/:id',verifyToken,updateListing)

export default router