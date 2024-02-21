import Listing from '../models/listing.models.js'
export async function createListing(req,res,next){
try {
    const listing = await Listing.create(req.body)
    return res.status(201).json(listing)
} catch (error) {
    next(error)
}
}