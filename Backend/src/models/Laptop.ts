import mongoose, { Schema } from 'mongoose'
import type { InferSchemaType } from 'mongoose'

const laptopSchema = new Schema(
  {
    price: {
      type: Number,
      required: true
    },
    stock: {
      type: Number,
      required: true
    },
    brand: {
      type: String,
      required: true,
      trim: true
    },
    model: {
      type: String,
      required: true,
      trim: true
    },
    processor: {
      type: String,
      required: true,
      trim: true
    },
    graphicCard: {
      type: String,
      required: true,
      trim: true
    },
    storage: {
      type: Number,
      required: true
    },
    ram: {
      type: Number,
      required: true
    },
    touchscreen: {
      type: Boolean,
      required: true
    },
    screen: {
      type: String,
      required: true,
      trim: true
    },
    images: [
      {
        type: String,
        required: true
      }
    ]
  },
  { timestamps: true }
)

export type Laptop = InferSchemaType<typeof laptopSchema>

export const LaptopModel = mongoose.model('Laptop', laptopSchema, 'laptops')
