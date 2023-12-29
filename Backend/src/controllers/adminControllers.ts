import type { Request, Response } from 'express'
import User from '../models/User'
import { requiredFields, Laptop } from '../models/Laptop'

const addLaptop = async (req: Request, res: Response) => {
  try {
    const newLaptop = {
      ...req.body
    }
    if (req.file) {
      newLaptop.images = `${process.env.BASE_URL}/images/${req.file.filename}`
    } else if (req.files && Array.isArray(req.files)) {
      newLaptop.images = req.files.map(file => `${process.env.BASE_URL}/images/${file.filename}`)
    }
    const missingFields: string[] = []
    requiredFields.forEach(field => {
      if (!newLaptop[field] && typeof newLaptop[field] !== 'object') {
        missingFields.push(field)
      } else if (
        Array.isArray(newLaptop[field]) &&
        newLaptop[field].length === 0
      ) {
        missingFields.push(`${field} is empty`)
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

const register = async (req: Request, res: Response) => {
  try {
    new User(req.body).save
    
  } catch (error: any) {
    return res.status(500).json({
      error: error.message
    })
  }
}

const login = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    return res.status(500).json({
      error: error.message
    })
  }
}

export { addLaptop, register }
