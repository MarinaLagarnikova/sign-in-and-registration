export interface LoginParams {
  email: string
  password: string
}

export async function loginApi(_params: LoginParams): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
}
