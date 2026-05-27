<script setup lang="ts">
import { ref } from 'vue'
import { Eye, EyeOff } from 'lucide-vue-next'
import { useLoginStore } from '../model/store'
import AppSwitch from '@/shared/ui/AppSwitch.vue'

const emit = defineEmits<{ forgotPassword: []; submit: [] }>()

const store = useLoginStore()
const showPassword = ref(false)
</script>

<template>
  <form
    class="flex flex-col gap-6"
    @submit.prevent="store.login().then((ok) => ok && emit('submit'))"
  >
    <div class="flex flex-col gap-4">
      <div>
        <label for="email" class="block text-sm/6 font-medium text-zinc-900">E-mail</label>
        <div class="mt-2">
          <input
            id="email"
            v-model="store.email"
            type="text"
            placeholder="demo@dvizh.io"
            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-zinc-900 outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-zinc-400 focus:outline-2 focus:-outline-offset-2 focus:outline-zinc-900 sm:text-sm/6"
          />
        </div>
      </div>

      <div>
        <label for="password" class="block text-sm/6 font-medium text-zinc-900">Пароль</label>
        <div class="relative mt-2">
          <input
            id="password"
            v-model="store.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="••••••••"
            class="block w-full rounded-md bg-white px-3 py-1.5 pr-9 text-base text-zinc-900 outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-zinc-400 focus:outline-2 focus:-outline-offset-2 focus:outline-zinc-900 sm:text-sm/6"
          />
          <button
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
            @click="showPassword = !showPassword"
          >
            <EyeOff v-if="showPassword" :size="16" />
            <Eye v-else :size="16" />
          </button>
        </div>
      </div>
    </div>

    <p v-if="store.error" class="text-sm text-red-600">
      {{ store.error }}
    </p>

    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between gap-3">
        <p class="text-sm text-zinc-900 cursor-default" @click="store.toggleGuestDevice()">Не запоминать e-mail и пароль</p>
        <AppSwitch :model-value="store.isGuestDevice" @update:model-value="store.toggleGuestDevice()" />
      </div>

      <button
        type="submit"
        :disabled="store.isLoading || !store.email || !store.password"
        class="flex items-center justify-center gap-2 w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-zinc-900/40"
      >
        <svg v-if="store.isLoading" class="size-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        Получить код
      </button>

      <button
        type="button"
        class="self-start text-sm font-normal text-zinc-900 transition-colors hover:text-zinc-500"
        style="text-decoration-line: underline; text-decoration-style: solid; text-decoration-skip-ink: none; text-decoration-color: #A1A1AA; text-decoration-thickness: auto; text-underline-offset: 23%; text-underline-position: from-font;"
        @click="emit('forgotPassword')"
      >
        Не помню пароль
      </button>
    </div>
  </form>
</template>
