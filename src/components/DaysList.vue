<script setup>
import DayCard from './DayCard.vue'
import Modal from './Modal.vue'
import { FEELING, TIME } from '@/utils/constants'
import { supabase } from '@/utils/supabase'

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

const daysContent = ref([])

const form = ref(structuredClone(initialDaysContent))
const formError = ref('')

const displayDayForm = ref(false)

const timesRemaining = (health) => {
  const usedTimes = health.map((item) => item.time)
  const timesRemaining = Object.values(TIME).filter((time) => !usedTimes.includes(time))
  return timesRemaining
}

const sortTimes = (a, b) => Object.values(TIME).indexOf(a.time) - Object.values(TIME).indexOf(b.time)

const getdaysContent = async () => {
  const { data } = await supabase
    .from('days')
    .select(`
      *,
      health (
        *
      )
    `)
    .order('date', { ascending: false })

  data.forEach((day) => {
    day.date = new Date(day.date).toLocaleDateString('en-GB')
    // Sort form.health by time
    day.health.sort(sortTimes)
  })
  daysContent.value = data

  window.scrollTo(0, document.body.scrollHeight)
}

const handleDay = async () => {
  // Sort form.health by time
  form.value.health.sort(sortTimes)

  // Check if at least one dish is filled
  if (form.value.health.every((item) => !item.dish)) {
    formError.value = 'Please fill in at least one dish'
    return false
  }

  // Check if dish is at least 3 characters long
  if (form.value.health.some((item) => item.dish.length < 3)) {
    formError.value = 'Dish must be at least 3 characters long'
    return false
  }

  // Edit day if id exists, else add a new day
  if (form.value.id) {
    form.value.health.forEach(async (item) => {
      await supabase
        .from('health')
        .update({
          feeling: item.feeling,
          dish: item.dish,
          time: item.time,
        })
        .eq('id', item.id)
    })

    await supabase
      .from('days')
      .update({
        date: new Date(form.value.date),
        note: form.value.note,
      })
      .eq('id', form.value.id)

    const day = daysContent.value.find((day) => day.id === form.value.id)
    day.date = new Date(form.value.date).toLocaleDateString('en-GB')
    day.note = form.value.note
    day.health = form.value.health
  } else {
    const { data } = await supabase
      .from('days')
      .insert({
        date: new Date(form.value.date),
        note: form.value.note,
      })
      .select()

    const idDay = data[0].id

    form.value.health.forEach(async (item) => {
      await supabase
        .from('health')
        .insert({
          id_day: idDay,
          feeling: item.feeling,
          dish: item.dish,
          time: item.time,
        })
    })

    daysContent.value.push({
      id: idDay,
      date: new Date(form.value.date).toLocaleDateString('en-GB'),
      note: form.value.note,
      health: form.value.health,
    })

    setInterval(() => {
      window.scrollTo(0, document.body.scrollHeight)
    }, 100)
  }

  closeDayModal()
}

const editDay = (id) => {
  displayDayForm.value = true

  const day = daysContent.value.find((day) => day.id === id)
  form.value = {
    ...day,
    // Prevent reactivity for health array
    health: day.health.map((item) => ({ ...item })),
    date: day.date.split('/').reverse().join('-'),
  }
}

const deleteDay = async (id) => {
  await supabase
    .from('health')
    .delete()
    .eq('id_day', id)

  await supabase
    .from('days')
    .delete()
    .eq('id', id)

  daysContent.value = daysContent.value.filter((day) => day.id !== id)
}

const closeDayModal = () => {
  displayDayForm.value = false
  form.value = structuredClone(initialDaysContent)
}

onMounted(async () => {
  await getdaysContent()
})
</script>

<template>
  <main class="flex-1 relative h-full px-8 pt-6 pb-12 bg-slate-900">
    <div class="grid grid-cols-1 md:grid-cols-2 flex-wrap gap-8">
      <DayCard v-for="day in daysContent" :key="day.id" :content="day" @edit:day="editDay" @delete:day="deleteDay" />
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
          <span v-if="form.id">Edit current day</span>
          <span v-else>Add a new day</span>
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
            Add a dish
          </button>
        </div>

        <p v-if="formError" class="mt-2 text-red-500">
          {{ formError }}
        </p>

        <div class="mt-6 flex justify-end">
          <button @click="closeDayModal" type="button" class="px-4 py-2 text-sm text-slate-800 bg-slate-300 hover:bg-slate-400 rounded-md">
            Cancel
          </button>

          <button v-if="form.id" @click="handleDay" type="submit" class="ml-3 px-4 py-2 text-sm text-white bg-cyan-500 hover:bg-cyan-700 rounded-md">
            Edit
          </button>

          <button v-else @click="handleDay" type="submit" class="ml-3 px-4 py-2 text-sm text-white bg-cyan-500 hover:bg-cyan-700 rounded-md">
            Add
          </button>
        </div>
      </div>
    </Modal>
  </main>
</template>
