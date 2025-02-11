import express from 'express';
import {deleteService, getServices , postService, updateService} from '../controllers/serviceControllers.js'

const router = express.Router();

router.get('/', getServices);
router.post('/',postService);
router.put('/:id',updateService);
router.delete('/:id',deleteService);

export default router;
