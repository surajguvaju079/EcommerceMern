import express from 'express'

import { getAllShopProducts ,getProductDetails} from '../../controller/shop/shop-controller.js'

const router = express.Router()

router.get('/getall',getAllShopProducts)
router.get('/get/:id',getProductDetails)
export default router