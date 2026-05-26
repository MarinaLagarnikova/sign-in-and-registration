import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginApi } from '../api/login'

export const useLoginStore = defineStore('loginByPassword', () => {
  const email = ref('')
  const password = ref('')
  const isGuestDevice = ref(false)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function login() {
    isLoading.value = true
    error.value = null
    try {
      await loginApi({ email: email.value, password: password.value })
      // TODO: router.push('/') after real login
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Неверный e-mail или пароль'
    } finally {
      isLoading.value = false
    }
  }

  function toggleGuestDevice() {
    isGuestDevice.value = !isGuestDevice.value
  }

  return { email, password, isGuestDevice, isLoading, error, login, toggleGuestDevice }
})
