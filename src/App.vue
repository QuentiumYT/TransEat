<script setup>
import Header from '@/components/Header.vue'
import DaysList from '@/components/DaysList.vue'
import Footer from '@/components/Footer.vue'

import { ref } from 'vue';

const user = ref({
  name: 'Guest',
  image: '',
})

const menu = {
  items: [
    { title: 'Home', url: '/' },
    { title: 'Recap', url: '/recap' },
    { title: 'Stats', url: '/stats' },
  ],
}
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header :user="user" />
    <DaysList />
    <Footer :menu="menu" />
  </div>
</template>

<style scoped></style>
