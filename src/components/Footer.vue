<script setup>
defineProps({
  menu: Object,
})
</script>

<template>
  <footer class="sticky z-10 bottom-0 w-full bg-gray-950 text-white p-4">
    <menu class="flex justify-between px-20">
      <li v-for="item in menu.items" :key="item.id" class="hover:underline">
        <a :href="item.url">{{ item.title }}</a>
      </li>
    </menu>
  </footer>
</template>
