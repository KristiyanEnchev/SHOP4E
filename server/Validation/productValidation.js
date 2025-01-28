import { z } from 'zod';

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId');
const urlSchema = z.string().url('Invalid URL');

const reviewSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  comment: z.string().min(5, 'Comment must be at least 5 characters'),
  rating: z.number().min(0).max(5, 'Rating must be between 0 and 5'),
});

const productBaseSchema = {
  name: z.string().min(2).max(100),
  slug: z.string().min(2).max(100),
  image: urlSchema,
  images: z.array(urlSchema).optional(),
  category: z.string().min(2).max(50),
  description: z.string().min(10).max(1000),
  price: z.number().positive('Price must be positive').min(0.01),
  _ownerId: objectIdSchema.optional(),
  countInStock: z.number().int().min(0),
  rating: z.number().min(0).max(5).optional(),
  numReviews: z.number().int().min(0).optional(),
  reviews: z.array(reviewSchema).optional(),
};

export const createProductSchema = {
  body: z.object(productBaseSchema),
};

export const updateProductSchema = {
  params: z.object({ id: objectIdSchema }),
  body: z.object({
    ...Object.fromEntries(
      Object.entries(productBaseSchema).map(([key, schema]) => [
        key,
        schema.optional(),
      ])
    ),
  }),
};

export const productQuerySchema = {
  query: z.object({
    page: z.string().regex(/^\d+$/).transform(Number).optional(),
    limit: z.string().regex(/^\d+$/).transform(Number).optional(),
    category: z.string().optional(),
    search: z.string().optional(),
    sort: z.enum(['price_asc', 'price_desc', 'newest', 'oldest']).optional(),
  }),
};
