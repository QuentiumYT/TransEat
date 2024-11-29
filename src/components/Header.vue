<script setup>
defineProps({
  user: Object,
})
</script>

<template>
  <header class="sticky z-10 top-0 w-full bg-gray-950 text-white p-4">
    <div class="flex justify-between items-center w-2/3 mx-auto">
      <span>{{ user.name }}</span>
      <img v-if="user.image" :src="user.image" alt="User avatar" class="h-8 w-8 rounded-full">
      <span v-else class="h-8 w-8 flex items-center justify-center rounded-full bg-gray-800">{{ user.name.slice(0, 2) }}</span>
    </div>
  </header>
</template>
