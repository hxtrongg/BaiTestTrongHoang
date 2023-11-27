import { Schema, model } from 'mongoose';
import { ObjectId, Date } from "mongoose";


export interface IArticles {
    _id?: ObjectId;
    title: string;
    keyword: string;
    description: string;
    content: string;
    date: Date
}

const articleSchema = new Schema<IArticles>({
    title: {
        type: String,
        require: true
    },
    keyword: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String,
        require: false
    },
    content: {
        type: String,
        require: false
    },
    date: {
        type: Date
    }
});


const Article = model<IArticles>('Article', articleSchema);
export default Article;