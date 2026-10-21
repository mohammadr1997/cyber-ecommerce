import { z } from "zod";

// =====================================================
// PRODUCT ATTRIBUTE
// =====================================================

const productAttributeSchema = z.object({
  attributeId: z.string(),

  value: z.string(),
});

// =====================================================
// PRODUCT SCHEMA
// =====================================================

export const productSchema = z.object({
  // ==========================
  // BASIC INFORMATION
  // ==========================

  name: z.string().min(1, {
    message: "Name is required",
  }),

  shortDescription: z.string().min(1, {
    message: "Short Description is required",
  }),

  longDescription: z.string().min(1, {
    message: "Long Description is required",
  }),

  // ==========================
  // PRODUCT INFORMATION
  // ==========================

  quantity: z
    .number()
    .min(1, {
      message: "Quantity must be greater than 0",
    })
    .positive({
      message: "Quantity must be a positive number",
    }),

  price: z.number().positive({
    message: "Price must be a positive number",
  }),

  // ==========================
  // BRAND
  // ==========================

  brand: z.string().min(1, {
    message: "Brand is required",
  }),

  // ==========================
  // CATEGORY
  // ==========================

  categoryId: z.string().min(1, {
    message: "Category is required",
  }),

  // ==========================
  // MAIN IMAGE
  // ==========================

  mainImage: z.string().min(1, {
    message: "Main image is required",
  }),

  // ==========================
  // PRODUCT COLORS
  // ==========================

  colors: z.array(z.string()).default([]),

  // ==========================
  // SPECIFIC ATTRIBUTES
  // ==========================

  attributes: z.array(productAttributeSchema).default([]),

  // ==========================
  // PRODUCT STATUS
  // ==========================

  isFeatured: z.boolean(),

  isBestSeller: z.boolean(),
});

export type ProductSchemaType = z.infer<typeof productSchema>;
export type ProductSchemaInputType = z.input<typeof productSchema>;
