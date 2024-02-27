import { LaptopModel, requiredFieldsLaptop } from '../models/Laptop'
import separateCamelCase from '../helpers/separateCamelCase'
import type { Request, Response } from 'express'
import type { Laptop } from '../models/Laptop'

export const addLaptop = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const newLaptop: Laptop = { ...req.body }
    const BASE_URL = process.env.BASE_URL
    const emptyFields: string[] = []

    if (req.file !== undefined) {
      newLaptop.images[0] = `${BASE_URL}/api/images/${req.file.filename}`
    } else if (req.files !== undefined && Array.isArray(req.files)) {
      newLaptop.images = req.files.map(
        file => `${BASE_URL}/api/images/${file.filename}`
      )
    }

    requiredFieldsLaptop.forEach(field => {
      if (newLaptop[field as keyof typeof newLaptop] === undefined) {
        emptyFields.push(separateCamelCase(field))
      }
    })

    if (emptyFields.length === 1) {
      return res.status(400).json({
        error: `The field ${emptyFields[0]} is missing`
      })
    } else if (emptyFields.length > 1) {
      return res.status(400).json({
        error: `The fields ${emptyFields.join(', ')} are missing`
      })
    }

    await new LaptopModel(newLaptop).save()

    res.json({
      msg: 'New laptop added'
    })
  } catch (error: unknown) {
    return res.status(500).json(error)
  }
}
