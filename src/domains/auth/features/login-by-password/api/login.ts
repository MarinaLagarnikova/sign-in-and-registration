export interface LoginParams {
  email: string
  password: string
}

export async function loginApi(params: LoginParams): Promise<void> {
  // TODO: replace with real API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  if (params.email !== 'demo@dvizh.io' || params.password !== 'password') {
    throw new Error('Неверный e-mail или пароль')
  }
}
