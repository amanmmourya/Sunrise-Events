import express from 'express';

import { getServices ,postService,updateService,deleteService , deleteAllServices, postAllServices} from '../controllers/serviceController.js';
const router = express.Router();

router.get('/', getServices);
router.delete('/deleteAll',deleteAllServices)
router.post('/postAll',postAllServices)
router.post('/',postService);
router.put('/:id',updateService);
router.delete('/:id',deleteService);

export default router;
