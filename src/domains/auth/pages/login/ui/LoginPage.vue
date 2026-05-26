<script setup lang="ts">
import { Download } from 'lucide-vue-next'
import { LoginForm, useLoginStore } from '@/domains/auth/features/login-by-password'

const store = useLoginStore()
</script>

<template>
  <div class="flex min-h-screen">
    <!-- Left panel -->
    <div class="flex w-72 shrink-0 flex-col bg-white px-8 py-12 lg:w-96">
      <!-- Logo -->
      <img src="@/shared/assets/logo-mr-group.svg" alt="MR Group" class="h-8 w-auto" />

      <!-- Form centered -->
      <div class="flex flex-1 flex-col justify-center">
        <LoginForm />
      </div>

      <!-- Toggle at bottom -->
      <div class="flex items-center justify-between gap-3">
        <div>
          <p class="text-sm font-medium text-zinc-900">Работаю на чужом компьютере</p>
          <p class="text-xs text-zinc-500">Не запоминать e-mail и пароль</p>
        </div>
        <button
          type="button"
          :class="[
            'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
            store.isGuestDevice ? 'bg-zinc-900' : 'bg-zinc-200',
          ]"
          role="switch"
          :aria-checked="store.isGuestDevice"
          @click="store.isGuestDevice = !store.isGuestDevice"
        >
          <span
            :class="[
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
              store.isGuestDevice ? 'translate-x-5' : 'translate-x-0',
            ]"
          />
        </button>
      </div>
    </div>

    <!-- Right panel (desktop only) -->
    <div class="relative hidden flex-1 items-center justify-center overflow-hidden bg-[#FF5C00] lg:flex">
      <!-- Diagonal stripes -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -inset-10 flex gap-10 -rotate-12">
          <div v-for="i in 14" :key="i" class="h-[200%] w-10 bg-white/10" />
        </div>
      </div>

      <!-- Content -->
      <div class="relative z-10 max-w-2xl space-y-6 px-12 text-center text-white">
        <span class="inline-block rounded-full border border-white px-4 py-1 text-sm">
          исследование ДВИЖа
        </span>
        <h1 class="text-5xl font-bold leading-tight">Синдром одного банка</h1>
        <p class="text-xl">на чем вы теряете до 15% продаж</p>
        <button
          class="inline-flex items-center gap-2 rounded-xl bg-neutral-700 px-6 py-3 text-white transition-colors hover:bg-neutral-600"
        >
          <Download :size="16" />
          Скачать
        </button>
      </div>
    </div>
  </div>
</template>
