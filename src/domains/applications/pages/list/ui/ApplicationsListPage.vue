<template>
  <div class="flex min-h-screen flex-col items-center justify-center gap-6 bg-white px-8">
    <h1 class="text-2xl font-semibold text-zinc-900">Список заявок</h1>
    <RouterLink
      to="/login"
      class="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Вернуться к авторизации
    </RouterLink>
  </div>
</template>
