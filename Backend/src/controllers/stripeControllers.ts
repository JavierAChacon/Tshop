import type { Request, Response } from 'express'
import dotenv from 'dotenv'
import Stripe from 'stripe'
dotenv.config()

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
const FRONTEND_URL = process.env.FRONTEND_URL

const stripe = new Stripe(`${STRIPE_SECRET_KEY}`)

interface ItemCheckout {
  name: string
  images: string[]
  id: string
  price: number
  quantity: number
}

export const createSession = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.map((item: ItemCheckout) => {
        const { name, images, id, price, quantity } = item
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name,
              images,
              metadata: {
                id
              }
            },
            unit_amount: price * 100
          },
          quantity
        }
      }),
      mode: 'payment',
      phone_number_collection: {
        enabled: true
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'KE']
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0,
              currency: 'usd'
            },
            display_name: 'Free shipping',
            // Delivers between 5-7 business days
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 5
              },
              maximum: {
                unit: 'business_day',
                value: 7
              }
            }
          }
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 1500,
              currency: 'usd'
            },
            display_name: 'Next day air',
            // Delivers in exactly 1 business day
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 1
              },
              maximum: {
                unit: 'business_day',
                value: 1
              }
            }
          }
        }
      ],
      success_url: `${FRONTEND_URL}/checkout/success`,
      cancel_url: `${FRONTEND_URL}/car`
    })

    res.json(session.url)
  } catch (error) {
    res.json(error)
  }
}
