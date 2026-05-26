<script setup lang="ts">
defineProps<{ modelValue: boolean }>()
defineEmits<{ 'update:modelValue': [value: boolean] }>()
</script>

<template>
  <button
    type="button"
    role="switch"
    :aria-checked="modelValue"
    :class="[
      'relative isolate inline-flex h-6 w-10 sm:h-5 sm:w-8 cursor-pointer rounded-full p-[3px] transition duration-200 ease-in-out',
      'ring-1 ring-inset focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
      modelValue
        ? 'bg-zinc-900 ring-zinc-950/90'
        : 'bg-zinc-200 ring-black/5',
    ]"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <span
      aria-hidden="true"
      :class="[
        'pointer-events-none relative inline-block size-[18px] sm:size-3.5 rounded-full border border-transparent bg-white shadow-sm ring-1 transition duration-200 ease-in-out',
        modelValue
          ? 'translate-x-4 sm:translate-x-3 ring-zinc-950/90 shadow-zinc-950/10'
          : 'translate-x-0 ring-black/5',
      ]"
    />
  </button>
</template>
