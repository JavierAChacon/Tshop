declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number,
      SECRET_KEY: string,
      BASE_URL: string
    }
  }
}

export {}
