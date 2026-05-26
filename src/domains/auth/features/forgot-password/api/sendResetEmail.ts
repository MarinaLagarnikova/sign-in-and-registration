export async function sendResetEmailApi(email: string): Promise<void> {
  if (!import.meta.env.DEV) {
    throw new Error('sendResetEmailApi stub called in production')
  }
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log('Reset email sent to:', email)
}
