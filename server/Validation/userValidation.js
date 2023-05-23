import { z } from 'zod';

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId');

const profileSchema = z.object({
  firstName: z.string().min(2).max(50).optional(),
  lastName: z.string().min(2).max(50).optional(),
  avatar: z
    .string()
    .regex(/^(http|https):\/\/.+/, 'URL must start with http:// or https://')
    .optional(),
  bio: z.string().max(500).optional(),
  address: z
    .object({
      street: z.string().max(100).optional(),
      city: z.string().max(50).optional(),
      country: z.string().max(50).optional(),
    })
    .optional(),
});

const userBaseSchema = {
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  isAdmin: z.boolean().default(false),
  profile: profileSchema.optional(),
};

export const registerSchema = {
  body: z
    .object({
      ...userBaseSchema,
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    }),
};

export const loginSchema = {
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1, 'Password is required'),
  }),
};

export const updateUserSchema = {
  params: z.object({
    userId: objectIdSchema,
  }),
  body: z.object({
    name: z.string().min(2).max(50).optional(),
    email: z.string().email().optional(),
    profile: z
      .object({
        firstName: z.string().min(2).max(50).optional(),
        lastName: z.string().min(2).max(50).optional(),
        avatar: z.string().optional(),
        bio: z.string().max(500).optional(),
        address: z
          .object({
            street: z.string().max(100).optional(),
            city: z.string().max(50).optional(),
            country: z.string().max(50).optional(),
          })
          .optional(),
      })
      .optional(),
  }),
};

export const userQuerySchema = {
  query: z.object({
    page: z.string().regex(/^\d+$/).transform(Number).optional(),
    limit: z.string().regex(/^\d+$/).transform(Number).optional(),
    sort: z.enum(['createdAt_asc', 'createdAt_desc']).optional(),
    search: z.string().optional(),
  }),
};
