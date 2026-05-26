<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'
import { useLoginStore } from '../model/store'

const store = useLoginStore()
</script>

<template>
  <form
    class="flex flex-col gap-6"
    @submit.prevent="store.login()"
  >
    <div class="flex flex-col gap-1">
      <h1 class="text-2xl font-semibold text-zinc-900">Вход</h1>
      <p class="text-sm text-zinc-500">Введите e-mail и пароль</p>
    </div>

    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-1.5">
        <label for="email" class="text-sm font-medium text-zinc-900">E-mail</label>
        <input
          id="email"
          v-model="store.email"
          type="email"
          required
          placeholder="demo@dvizh.io"
          class="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/20 transition-colors"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="password" class="text-sm font-medium text-zinc-900">Пароль</label>
        <input
          id="password"
          v-model="store.password"
          type="password"
          required
          placeholder="••••••••"
          class="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/20 transition-colors"
        />
      </div>
    </div>

    <p v-if="store.error" class="text-sm text-red-600">
      {{ store.error }}
    </p>

    <div class="flex flex-col gap-3">
      <button
        type="submit"
        :disabled="store.isLoading"
        class="flex items-center justify-center gap-2 w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-zinc-900/40"
      >
        <Loader2 v-if="store.isLoading" class="h-4 w-4 animate-spin" />
        Войти
      </button>

      <p class="text-center">
        <a
          href="#"
          class="text-sm text-zinc-900 hover:text-zinc-600 transition-colors"
        >
          Не помню пароль
        </a>
      </p>
    </div>
  </form>
</template>
