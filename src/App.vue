<script setup>
import Header from './components/Header.vue'
import DaysList from './components/DaysList.vue'
import Footer from './components/Footer.vue'

const user = {
  name: 'Quentin Lienhardt',
  image: 'https://assets.quentium.fr/logo/logo.svg',
}

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
