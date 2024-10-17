<script setup>
defineProps({
  user: Object,
})
</script>

<template>
  <header class="bg-gray-950 text-white p-4">
    <div class="flex justify-between items-center w-2/3 mx-auto">
      <span>{{ user.name }}</span>
      <img :src="user.image" alt="User avatar" class="h-8 w-8 rounded-full">
    </div>
  </header>
</template>
