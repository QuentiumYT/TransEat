<script setup>
import Header from '@/components/Header.vue'
import DaysList from '@/components/DaysList.vue'
import Footer from '@/components/Footer.vue'
import { supabase } from '@/utils/supabase'

import { onMounted, ref } from 'vue';

const menu = {
  items: [
    { title: 'Home', url: '/' },
    { title: 'Recap', url: '/recap' },
    { title: 'Stats', url: '/stats' },
  ],
}

const session = ref(null)

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header :session="session" />
    <DaysList />
    <Footer :menu="menu" />
  </div>
</template>

<style scoped></style>
