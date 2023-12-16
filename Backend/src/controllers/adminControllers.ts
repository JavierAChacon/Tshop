import type { Request, Response } from 'express'
import { requiredFields, Laptop } from '../models/Laptop'

const addLaptop = async (req: Request, res: Response) => {
  try {
    // validate missing fields
    const missingFields: string[] = []
    requiredFields.forEach(field => {
      if (!req.body[field] && typeof req.body[field] !== 'object') {
        missingFields.push(field)
      } else if (typeof req.body[field] === 'object') {
        Object.keys(req.body[field]).forEach(key => {
          if (!req.body[field][key]) {
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
    await new Laptop(req.body).save()
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
