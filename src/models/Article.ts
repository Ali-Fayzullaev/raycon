import mongoose, { Schema, Document } from "mongoose";

export interface IArticle extends Document {
  title: string;
  slug: string;
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
      required: [true, "Slug обязателен"],
      unique: true,
      trim: true,
      lowercase: true,
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

// Создаём slug из заголовка автоматически
ArticleSchema.pre("save", function () {
  if (this.isModified("title") && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zа-яё0-9\s-]/gi, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }
});

export default mongoose.models.Article ||
  mongoose.model<IArticle>("Article", ArticleSchema);
