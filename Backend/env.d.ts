declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_PORT: number
      BASE_URL: string
      DB_URI: string
      FRONTEND_URL: string
      CLOUDINARY_CLOUD_NAME: string
      CLOUDINARY_API_KEY: string
      CLOUDINARY_API_SECRET: string
      STRIPE_SECRET_KEY: string
    }
  }
}

export {}
