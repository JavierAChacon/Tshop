declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_PORT: number
      DB_URI: string,
      BASE_URL: string
    }
  }
}

export {}
