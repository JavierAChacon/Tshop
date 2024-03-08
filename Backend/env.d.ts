declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_PORT: number
      DB_URI: string
      FRONTEND_URL: string
      CLOUDINARY_CLOUD_NAME: string
      CLOUDINARY_API_KEY: string
      CLOUDINARY_API_SECRET: string
    }
  }
}

export {}
