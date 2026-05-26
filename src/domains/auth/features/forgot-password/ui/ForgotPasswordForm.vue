<script setup lang="ts">
import { ref } from 'vue'
import { sendResetEmailApi } from '../api/sendResetEmail'

defineEmits<{ back: [email: string] }>()

const email = ref('')
const isLoading = ref(false)
const error = ref<string | null>(null)
const sent = ref(false)

defineExpose({ email, sent })

async function submit() {
  isLoading.value = true
  error.value = null
  try {
    await sendResetEmailApi(email.value)
    sent.value = true
  } catch {
    error.value = 'Не удалось отправить письмо. Попробуйте ещё раз.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <template v-if="!sent">
      <form class="flex flex-col gap-6" @submit.prevent="submit">
        <div>
          <label for="reset-email" class="block text-sm/6 font-medium text-zinc-900">E-mail</label>
          <div class="mt-2">
            <input
              id="reset-email"
              v-model="email"
              type="text"
              placeholder="demo@dvizh.io"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-zinc-900 outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-zinc-400 focus:outline-2 focus:-outline-offset-2 focus:outline-zinc-900 sm:text-sm/6"
            />
          </div>
        </div>

        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

        <button
          type="submit"
          :disabled="isLoading || !email"
          class="flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <svg v-if="isLoading" class="size-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Отправить письмо
        </button>
      </form>
    </template>

  </div>
</template>
