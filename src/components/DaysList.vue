<script setup>
import DayCard from './DayCard.vue'
import Modal from './Modal.vue'
import { FEELING, TIME } from '@/utils/constants'

import { onMounted, ref } from 'vue'

const initialDaysContent = {
  date: new Date().toISOString().substring(0, 10),
  note: '',
  health: [{
    feeling: FEELING.UNKNOWN,
    dish: '',
    time: TIME.MORNING,
  }],
}

let daysContent = ref([{
  id: Math.random().toString(10).substring(2, 15),
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
  id: Math.random().toString(10).substring(2, 15),
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
}, {
  id: Math.random().toString(10).substring(2, 15),
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
}, {
  id: Math.random().toString(10).substring(2, 15),
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
}])

const timesRemaining = (health) => {
  const usedTimes = health.map((item) => item.time)
  const timesRemaining = Object.values(TIME).filter((time) => !usedTimes.includes(time))
  return timesRemaining
}

const form = ref(structuredClone(initialDaysContent))

const displayDayForm = ref(false)

const addDay = () => {
  // Sort form.health by time
  form.value.health.sort((a, b) => Object.values(TIME).indexOf(a.time) - Object.values(TIME).indexOf(b.time))

  daysContent.value.push({
    id: Math.random().toString(10).substring(2, 15),
    date: form.value.date,
    note: form.value.note,
    health: form.value.health,
  })

  setInterval(() => {
    window.scrollTo(0, document.body.scrollHeight)
  }, 100)

  form.value = structuredClone(initialDaysContent)

  closeDayModal()
}

const closeDayModal = () => {
  displayDayForm.value = false
}

const deleteDay = (id) => {
  daysContent.value = daysContent.value.filter((day) => day.id !== id)
}

onMounted(() => {
  window.scrollTo(0, document.body.scrollHeight)
})
</script>

<template>
  <main class="flex-1 relative h-full px-8 pt-6 pb-12 bg-slate-900">
    <div class="grid grid-cols-1 md:grid-cols-2 flex-wrap gap-8">
      <DayCard v-for="day in daysContent" :key="day.id" :content="day" @delete:day="deleteDay" />
    </div>

    <div class="fixed z-20 left-1/2 transform -translate-x-1/2 bottom-10">
      <button @click="displayDayForm = true" class="flex justify-center items-center bg-cyan-500 hover:bg-cyan-700 text-white p-4 rounded-full">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
      </button>
    </div>

    <Modal :show="displayDayForm" @close="closeDayModal">
      <div class="p-6">
        <h2 class="text-lg font-medium text-white">
          Add a new day
        </h2>

        <div class="mt-4">
          <label for="date" class="block text-sm font-medium text-slate-200">Date</label>
          <input v-model="form.date" type="date" id="date" name="date" class="mt-1 block px-3 py-2 border text-slate-800 border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm">
        </div>

        <div class="mt-4">
          <label for="note" class="block text-sm font-medium text-slate-200">Note</label>
          <textarea v-model="form.note" id="note" name="note" rows="3" class="mt-1 block w-full px-3 py-2 border text-slate-800 border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"></textarea>
        </div>

        <div class="flex flex-col gap-y-4 mt-4">
          <div v-for="(item, index) in form.health" :key="index" class="flex gap-4">
            <div class="w-fit">
              <label for="feeling" class="block text-sm font-medium text-slate-200">Feeling</label>
              <select v-model="item.feeling" id="feeling" name="feeling" class="mt-1 block w-fit py-2 border text-slate-800 border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm">
                <option v-for="feeling in Object.values(FEELING)" :key="feeling" :value="feeling">{{ feeling }}</option>
              </select>
            </div>

            <div class="w-full">
              <label for="dish" class="block text-sm font-medium text-slate-200">Dish</label>
              <input v-model="item.dish" type="text" id="dish" name="dish" class="mt-1 block w-full px-3 py-2 border text-slate-800 border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm">
            </div>

            <div class="w-fit">
              <label for="time" class="block text-sm font-medium text-slate-200">Time</label>
              <select v-model="item.time" id="time" name="time" class="mt-1 block w-fit py-2 border text-slate-800 border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm">
                <option v-for="time in Object.values(TIME)" :key="time" :value="time">{{ time }}</option>
              </select>
            </div>

            <div class="flex items-end">
              <button @click="form.health.splice(index, 1)" type="button" class="flex justify-center items-center bg-red-500 hover:bg-red-700 text-white size-10 rounded-full">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          <button v-if="timesRemaining(form.health).length > 0" @click="form.health.push({ feeling: FEELING.UNKNOWN, dish: '', time: timesRemaining(form.health)[0] })" type="button" class="flex justify-center items-center bg-cyan-500 hover:bg-cyan-700 text-white p-2 rounded-full">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </button>
        </div>

        <div class="mt-6 flex justify-end">
          <button @click="closeDayModal" type="button" class="px-4 py-2 text-sm text-slate-800 bg-slate-300 hover:bg-slate-400 rounded-md">
            Annuler
          </button>

          <button @click="addDay" type="submit" class="ml-3 px-4 py-2 text-sm text-white bg-cyan-500 hover:bg-cyan-700 rounded-md">
            Add
          </button>
        </div>
      </div>
    </Modal>
  </main>
</template>
