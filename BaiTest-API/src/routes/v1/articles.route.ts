import express from 'express';
import articlesController from '../../controllers/articles.controller';

const router = express.Router();

//Get All articles from DB
router.get('/', articlesController.getAll);

//get articles by ID
router.get('/:id', articlesController.getItemById);

//Create a new article
router.post('/', articlesController.createItem);

/**
 * Update a article by ID
 * PATH /api/v1/:id
 */
router.patch('/:id',articlesController.updateItem);

/**
 * Delete a article by ID
 * DELETE /api/v1/:id
 */
router.delete('/:id', articlesController.deleteItem);

export default router;