<script setup>
import Card from './Card.vue'
import { FEELING, TIME } from '@/utils/constants'

const content = [{
  id: Math.random().toString(36).substring(2, 15),
  date: new Date(new Date().setDate(new Date().getDate() - 10)).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric' }),
  note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  health: [{
    feeling: FEELING.BAD,
    dish: 'Pain et beurre confiture',
    time: TIME.MORNING,
  }, {
    feeling: FEELING.MEDIUM,
    dish: 'Ravioli crème et champignons',
    time: TIME.MIDDAY,
  }, {
    feeling: FEELING.GOOD,
    dish: 'Petits beurres',
    time: TIME.AFTERNOON,
  }, {
    feeling: FEELING.GOOD,
    dish: 'Gnocchis à la sauce tomate',
    time: TIME.EVENING,
  }, {
    feeling: FEELING.GOOD,
    dish: 'Morceau de chocolat',
    time: TIME.NIGHT,
  }],
}, {
  id: Math.random().toString(36).substring(2, 15),
  date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric' }),
  note: 'Elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing.',
  health: [{
    feeling: FEELING.GOOD,
    dish: 'Céréales et lait',
    time: TIME.MORNING,
  }, {
    feeling: FEELING.GOOD,
    dish: 'Poulet rôti et riz',
    time: TIME.MIDDAY,
  }, {
    feeling: FEELING.GOOD,
    dish: 'Pâtes à la carbonara',
    time: TIME.EVENING,
  }],
}]
</script>

<template>
  <main class="flex-1 relative h-full px-8 py-6 bg-slate-900">
    <div class="grid grid-cols-1 md:grid-cols-2 flex-wrap gap-8">
      <Card v-for="item in content" :key="item.id" :content="item" />
    </div>

    <div class="fixed left-1/2 transform -translate-x-1/2 bottom-20">
      <button class="flex justify-center items-center bg-cyan-500 hover:bg-cyan-700 text-white font-bold p-4 rounded-full">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
      </button>
    </div>
  </main>
</template>
