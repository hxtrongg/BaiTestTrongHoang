import { NextFunction, Request, Response } from 'express';
import { sendJsonSuccess } from '../../helpers/responseHandler';
import articlesService from '../services/articles.service';

// test thử.
const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const articles= await articlesService.getAll();
    sendJsonSuccess(res)(articles);
  } catch (error) {
    next(error);
  }
};

const getItemById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const article = await articlesService.getItemById(req.params.id);
    sendJsonSuccess(res)(article);
  } catch (error) {
    next(error);
  }
};

const createItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const newArticle = await articlesService.createItem(payload);
    sendJsonSuccess(res)(newArticle);
  } catch (error) {
    next(error);
  }
};

const updateItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    console.log(id, req.body);
    const payload = req.body;
    const updatedArticle = await articlesService.updateItem(id, payload);
    sendJsonSuccess(res)(updatedArticle);
  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedArticle = await articlesService.deleteItem(id);
    sendJsonSuccess(res)(deletedArticle);
  } catch (err) {
    next(err);
  }
};

export default {
  getAll,
  getItemById,
  updateItem,
  createItem,
  deleteItem,
};