export interface LoginParams {
  email: string
  password: string
}

export async function loginApi(_params: LoginParams): Promise<void> {
  if (!import.meta.env.DEV) {
    throw new Error('loginApi stub called in production — replace with real API call')
  }
  // Dev-only stub: simulates network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  // Stub always succeeds in dev; replace with real API call
}
