import mongoose, { Schema, InferSchemaType } from 'mongoose'
const laptopSchema = new Schema(
  {
    stock: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    brand: {
      type: String,
      required: true,
      trim: true
    },
    OS: {
      type: String,
      required: true,
      trim: true
    },
    model: {
      type: String,
      required: true,
      trim: true
    },
    ram: {
      type: Number,
      required: true
    },
    processor: {
      brand: {
        type: String,
        required: true,
        trim: true
      },
      model: {
        type: String,
        required: true,
        trim: true
      }
    },
    screen: {
      size: {
        type: Number,
        required: true
      },
      resolution: {
        type: String,
        required: true,
        trim: true
      },
      touchScreen: {
        type: Boolean,
        default: false
      }
    },
    storage: {
      capacity: {
        type: String,
        required: true,
        trim: true
      },
      storageType: [
        {
          type: String,
          enum: ['HDD', 'SSD'],
          required: true
        }
      ]
    },
    graphicCard: {
      brand: {
        type: String,
        trim: true
      },
      model: {
        type: String,
        trim: true
      }
    },
    images: [{
      type: String,
      required: true
    }]
  },
  { timestamps: true }
)

type laptop = InferSchemaType<typeof laptopSchema>
const requiredFields: string[] = Object.keys(laptopSchema.obj)
const Laptop = mongoose.model('Laptop', laptopSchema, 'laptops')

export { Laptop, requiredFields }
