import type { Request, Response } from 'express'
import { requiredFields, Laptop } from '../models/Laptop'

const addLaptop = async (req: Request, res: Response) => {
  try {
    const newLaptop = {
      ...req.body,
      images: (req?.files as Express.Multer.File[])?.map(file => file.filename)
    }
    // validate missing fields
    const missingFields: string[] = []
    requiredFields.forEach(field => {
      if (!newLaptop[field] && typeof newLaptop[field] !== 'object') {
        missingFields.push(field)
      } else if (typeof newLaptop[field] === 'object') {
        Object.keys(newLaptop[field]).forEach(key => {
          if (!newLaptop[field][key]) {
            missingFields.push(`${key} of ${field}`)
          }
        })
      }
    })
    if (missingFields.length === 1) {
      return res.status(400).json({
        error: `The field ${missingFields[0]} is required`
      })
    } else if (missingFields.length === 2) {
      return res.status(400).json({
        error: `The fields ${missingFields.join(' and ')} are required`
      })
    } else if (missingFields.length > 2) {
      return res.status(400).json({
        error: `The fields ${missingFields.join(', ')} are required`
      })
    }
    await new Laptop(newLaptop).save()
    res.json({
      msg: 'Latop added successfully'
    })
  } catch (error: any) {
    return res.status(500).json({
      error: error.message
    })
  }
}

export { addLaptop }
