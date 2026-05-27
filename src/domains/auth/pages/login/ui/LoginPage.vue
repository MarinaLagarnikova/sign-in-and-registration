<script setup lang="ts">
import { ref, computed, type ComponentPublicInstance } from 'vue'
import { useRouter } from 'vue-router'
import { LoginForm, useLoginStore } from '@/domains/auth/features/login-by-password'
import { ForgotPasswordForm } from '@/domains/auth/features/forgot-password'
import { SmsCodeForm } from '@/domains/auth/features/sms-verify'

const store = useLoginStore()
const router = useRouter()
const view = ref<'login' | 'forgot-password' | 'sms-verify'>('login')
const forgotRef = ref<ComponentPublicInstance & { email: string; sent: boolean } | null>(null)

const title = computed(() => {
  if (view.value === 'forgot-password') return 'Восстановление пароля'
  if (view.value === 'sms-verify') return 'Введите код из СМС'
  return 'Вход'
})

const subtitle = computed(() => {
  if (view.value === 'forgot-password') {
    if (forgotRef.value?.sent) {
      return { text: 'Письмо отправлено на ', email: forgotRef.value.email }
    }
    return { text: 'Отправим письмо со ссылкой для восстановления' }
  }
  if (view.value === 'sms-verify') {
    return { text: 'Отправили на номер ', phone: '+7 901 ***-**-19' }
  }
  return null
})

const showBack = computed(() => view.value !== 'login')

function handleBack() {
  if (view.value === 'forgot-password') {
    if (forgotRef.value) store.email = forgotRef.value.email
    view.value = 'login'
  } else {
    view.value = 'login'
  }
}
</script>

<template>
  <div class="flex h-dvh">
    <!-- Left panel -->
    <div class="w-full overflow-y-auto bg-white lg:w-5/12 flex flex-col justify-center">
      <div class="mx-auto w-full max-w-sm px-8 lg:px-0 flex flex-col gap-10 py-12">

        <!-- Лого -->
        <img src="@/shared/assets/logo-mr-group.svg" alt="MR Group" class="h-[48px] w-auto self-start" />

        <!-- Контент-блок с фиксированной минимальной высотой = самый длинный сценарий -->
        <div class="flex flex-col gap-6 min-h-[400px] sm:min-h-[404px]">
          <!-- Заголовок + подзаголовок -->
          <div class="flex flex-col gap-2">
            <h1 class="text-2xl font-semibold text-zinc-900">{{ title }}</h1>
            <p v-if="subtitle" class="text-sm font-light text-zinc-500">
              <template v-if="subtitle.email">
                Письмо отправлено на <span class="font-medium text-zinc-900">{{ subtitle.email }}</span>. Проверьте почту.
              </template>
              <template v-else-if="subtitle.phone">
                Отправили на номер <span class="text-zinc-900">{{ subtitle.phone }}</span>
              </template>
              <template v-else>{{ subtitle.text }}</template>
            </p>
          </div>

          <LoginForm
            v-if="view === 'login'"
            @forgot-password="view = 'forgot-password'"
            @submit="view = 'sms-verify'"
          />
          <ForgotPasswordForm
            v-else-if="view === 'forgot-password'"
            ref="forgotRef"
          />
          <SmsCodeForm
            v-else
            @back="view = 'login'"
            @success="router.push('/applications')"
          />

          <!-- Кнопка "Вернуться" — всегда занимает место, invisible когда не нужна -->
          <button
            type="button"
            :class="['flex items-center gap-1.5 self-start text-sm text-zinc-900 hover:text-zinc-500 transition-colors', !showBack && 'invisible']"
            @click="handleBack"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Вернуться
          </button>
        </div>

      </div>
    </div>

    <!-- Right panel (desktop only) -->
    <div class="group relative hidden flex-1 items-center justify-center overflow-hidden lg:flex">
      <!-- Background image -->
      <img
        src="@/shared/assets/login-bg.png"
        class="absolute inset-0 h-full w-full object-cover"
        alt=""
      />

      <!-- Content -->
      <div class="relative z-10 max-w-2xl space-y-6 px-12 text-center text-white">
        <div class="flex flex-col gap-6 transition-transform duration-500 group-hover:-rotate-[5deg]">
          <span class="self-center rounded-full border border-white/80 px-4 py-1 text-sm font-normal">
            исследование ДВИЖа
          </span>
          <h2 class="text-7xl font-bold leading-none">Синдром одного банка</h2>
          <p class="text-2xl font-normal text-white/60">на чем вы теряете до 15% продаж</p>
        </div>
        <button
          class="inline-flex items-center justify-center rounded-xl bg-neutral-700 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-600"
        >
          Скачать
        </button>
      </div>
    </div>
  </div>
</template>
