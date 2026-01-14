import mongoose, { Schema, Document } from "mongoose";

export interface IArticle extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug?: string; // Теперь опционально, для совместимости
  content: string;
  excerpt: string;
  coverImage?: string;
  coverImageId?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<IArticle>(
  {
    title: {
      type: String,
      required: [true, "Заголовок обязателен"],
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
      sparse: true, // Позволяет null/undefined без конфликта уникальности
    },
    content: {
      type: String,
      required: [true, "Контент обязателен"],
    },
    excerpt: {
      type: String,
      required: [true, "Краткое описание обязательно"],
      maxlength: [300, "Краткое описание не должно превышать 300 символов"],
    },
    coverImage: {
      type: String,
    },
    coverImageId: {
      type: String,
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Slug больше не генерируется автоматически - используем _id

export default mongoose.models.Article ||
  mongoose.model<IArticle>("Article", ArticleSchema);
