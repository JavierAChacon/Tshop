import { LaptopModel, requiredFieldsLaptop } from '../models/Laptop'
import separateCamelCase from '../helpers/separateCamelCase'
import { v2 as cloudinary } from 'cloudinary'
import type { Request, Response } from 'express'
import type { Laptop } from '../models/Laptop'

export const addLaptop = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const newLaptop: Laptop = { ...req.body }
    const emptyFields: string[] = []

    if (req.file !== undefined) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'Tshop'
      })
      const imageUrl = result.secure_url
      newLaptop.images[0] = imageUrl
    } else if (req.files !== undefined && Array.isArray(req.files)) {
      const promises = req.files.map(async file => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'Tshop'
        })
        return result.secure_url
      })
      newLaptop.images = await Promise.all(promises)
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
    return res.status(500).send(error)
  }
}

export const getLaptops = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const laptops: Laptop[] = await LaptopModel.find()

    if (laptops.length === 0) {
      res.status(404).json({
        error: 'Laptops not found'
      })
    }

    return res.json(laptops)
  } catch (error: unknown) {
    res.status(500).json(error)
  }
}

export const getLaptop = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const idToGetLaptop = req.params.id
    const laptopToGet = await LaptopModel.findById(idToGetLaptop)

    if (laptopToGet === null) {
      return res.status(404).json({
        error: 'Laptop not found'
      })
    }

    return res.json({
      laptop: laptopToGet
    })
  } catch (error: unknown) {
    res.status(500).json(error)
  }
}

export const deleteLaptop = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const idToDeleteLaptop = req.params.id
    const laptopToDelete = await LaptopModel.findByIdAndDelete(idToDeleteLaptop)

    if (laptopToDelete === null) {
      return res.status(404).json({
        error: 'Laptop not found'
      })
    }

    return res.json({
      msg: 'Laptop deleted'
    })
  } catch (error: unknown) {
    res.status(500).json(error)
  }
}

export const updateLaptop = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const idToUpdateLaptop = req.params.id
    const updateFields: Laptop = req.body
    const missingUpdateFields: string[] = []

    Object.entries(updateFields).forEach(([key, value]) => {
      if (value === '') {
        missingUpdateFields.push(key)
      }
    })

    if (missingUpdateFields.length === 1) {
      return res.status(400).json({
        error: `The field ${missingUpdateFields[0]} is missing`
      })
    } else if (missingUpdateFields.length > 1) {
      return res.status(400).json({
        error: `The fields ${missingUpdateFields.join(', ')} are missing`
      })
    }

    const laptopToUpdate = await LaptopModel.findByIdAndUpdate(
      idToUpdateLaptop,
      updateFields
    )

    if (laptopToUpdate === null) {
      return res.status(500).json({
        msg: 'Laptop not found'
      })
    }

    res.json({
      msg: 'Laptop updated'
    })
  } catch (error: unknown) {
    res.status(500).json(error)
  }
}
