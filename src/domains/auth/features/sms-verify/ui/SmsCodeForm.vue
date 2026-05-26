<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const RESEND_DELAY = 45

defineProps<{ phone?: string }>()
const emit = defineEmits<{ back: []; success: [] }>()

const code = ref('')
const codeInput = ref<HTMLInputElement | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

const countdown = ref(RESEND_DELAY)
let timer: ReturnType<typeof setInterval> | null = null

const countdownLabel = computed(() => {
  const m = Math.floor(countdown.value / 60)
  const s = String(countdown.value % 60).padStart(2, '0')
  return `${m}:${s}`
})

function startCountdown() {
  countdown.value = RESEND_DELAY
  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) clearInterval(timer!)
  }, 1000)
}

async function resendCode() {
  startCountdown()
  // TODO: real resend API call
}

onMounted(async () => {
  await nextTick()
  codeInput.value?.focus()
  startCountdown()
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

async function submit() {
  isLoading.value = true
  error.value = null
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // TODO: replace with real verification
    emit('success')
  } catch {
    error.value = 'Неверный код. Попробуйте ещё раз.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <form class="flex flex-col gap-6" @submit.prevent="submit">
    <div>
      <label for="sms-code" class="block text-sm/6 font-medium text-zinc-900">Код из СМС</label>
      <div class="mt-2 flex gap-2 [&>*]:w-1/2">
        <input
          id="sms-code"
          ref="codeInput"
          v-model="code"
          type="text"
          inputmode="numeric"
          maxlength="6"
          autocomplete="one-time-code"
          placeholder="000000"
          class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-zinc-900 outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-zinc-400 focus:outline-2 focus:-outline-offset-2 focus:outline-zinc-900 sm:text-sm/6"
        />
        <button
          type="button"
          :disabled="countdown > 0"
          class="shrink-0 rounded-md px-3 py-1.5 text-sm font-medium transition-colors outline-1 outline-zinc-300 disabled:cursor-not-allowed disabled:text-zinc-400 disabled:outline-zinc-200 text-zinc-900 hover:enabled:bg-zinc-50"
          @click="resendCode"
        >
          {{ countdown > 0 ? `Новый код ${countdownLabel}` : 'Получить код' }}
        </button>
      </div>
    </div>

    <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

    <button
      type="submit"
      :disabled="isLoading || !code"
      class="flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <svg v-if="isLoading" class="size-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      Подтвердить код
    </button>

  </form>
</template>
