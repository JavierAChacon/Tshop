import { Request, Response, NextFunction } from 'express'
import { Laptop, requiredFieldsLaptop } from '../models/Laptop'
import { Admin } from '../models/Admin'
import generateJWT from '../helpers/generateJwt'
import bcrypt from 'bcrypt'

const addLaptop = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newLaptop = {
      ...req.body
    }
    if (req.file) {
      newLaptop.images = `${process.env.BASE_URL}:${process.env.PORT}/api/images/${req.file.filename}`
    } else if (req.files && Array.isArray(req.files)) {
      newLaptop.images = req.files.map(
        file =>
          `${process.env.BASE_URL}:${process.env.PORT}/api/images/${file.filename}`
      )
    }
    const missingFields: string[] = []
    requiredFieldsLaptop.forEach(field => {
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

const getLaptops = async (req: Request, res: Response) => {
  try {
    const laptops = await Laptop.find().sort({ createdAt: -1 })
    if (!laptops) {
      res.status(404).json({
        error: 'Laptops not found'
      })
    }
    res.json({
      laptops
    })
  } catch (error: any) {
    res.status(500).json({
      error: error.message
    })
  }
}

const getLaptop = async (req: Request, res: Response) => {
  try {
    const laptop = await Laptop.findById(req.params.id, { timestamps: false })
    if (!laptop) {
      return res.status(404).json({
        error: 'Laptop not found'
      })
    }
    return res.json({
      laptop
    })
  } catch (error: any) {
    res.status(500).json({
      error: error.message
    })
  }
}

const updateLaptop = async (req: Request, res: Response) => {
  try {
    const newLaptop = {
      ...req.body
    }
    if (req.file) {
      newLaptop.images = `${process.env.BASE_URL}:${process.env.PORT}/api/images/${req.file.filename}`
    } else if (req.files && Array.isArray(req.files)) {
      newLaptop.images = req.files.map(
        file =>
          `${process.env.BASE_URL}:${process.env.PORT}/api/images/${file.filename}`
      )
    }
    const laptop = await Laptop.findByIdAndUpdate(req.params.id, newLaptop)
    return res.json({
      msg: 'Laptop edited successfully',
      laptop
    })
  } catch (error: any) {
    res.status(500).json({
      error: error.message
    })
  }
}

const deleteLaptop = async (req: Request, res: Response) => {
  try {
    const laptop = await Laptop.findByIdAndDelete(req.params.id)
    return res.json({
      msg: 'Laptop deleted successfully',
      laptop
    })
  } catch (error: any) {
    res.status(500).json({
      error: error.message
    })
  }
}

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const admin = await Admin.findOne({ email })
    if (!admin) {
      res.status(404).json({
        error: 'User not found'
      })
    } else if (!(await bcrypt.compare(password, admin.password))) {
      res.status(400).json({
        error: 'Incorrect password'
      })
    } else {
      res.json({ token: generateJWT(req.body) })
    }
  } catch (error: any) {
    res.json({
      error: error.message
    })
  }
}

export { addLaptop, getLaptops, getLaptop, deleteLaptop, updateLaptop, login }
