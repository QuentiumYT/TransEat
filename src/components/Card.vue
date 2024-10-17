<script setup>
import { FEELING } from '@/utils/constants'
import check from '@/assets/check.png'
import cross from '@/assets/cross.png'

defineProps({
  content: Object,
})

function isGoodDay(health) {
  return health.every((item) => item.feeling === FEELING.GOOD)
}
</script>

<template>
  <div class="flex flex-col min-w-0 bg-slate-800 border-2 border-white text-white rounded-lg">
    <div class="flex">
      <div class="border-r border-white">
        <p class="font-bold p-4">
          {{ content.date }}
        </p>
      </div>
      <div class="border-r border-white min-w-0" title="Edit note">
        <div class="flex items-center w-full p-4 cursor-pointer">
          <p class="truncate">{{ content.note }}</p>
          <svg class="h-6 w-10 min-h-4 min-w-4" fill="currentColor" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
            <path d="M201.6 9.5c-2.2.8-5.3 2.4-7 3.6-3.5 2.5-17.5 17.1-34.5 35.9-32 35.2-69 71.9-108.8 107.8l-19 17-4.1 10.5c-6.6 16.9-20.3 58.7-20 61 .2 1.3 1.1 2.3 2.4 2.5 2.1.3 31.6-9.6 55.9-18.8 16.2-6.2 13.8-4.2 40-33.5 31.9-35.6 64.8-68 109-107.1C243.8 63.2 248 57.7 248 45.6c-.1-6.8-3.1-11.5-15.6-23.7-9.1-8.9-12.8-11.9-15.9-12.8-5.3-1.4-10.1-1.3-14.9.4m11.7 15.9c4.6 1.9 17.3 15.4 18.1 19.3.4 1.7.2 5-.4 7.2-1.2 4.7-5.6 9-42 42.2-39 35.5-50.3 46.7-102.1 100.9l-18.7 19.5-7.8 2.9c-4.4 1.6-8.4 3.1-9.1 3.3-.6.3-1.4-.6-1.8-1.8-1.1-3.2-8.1-10.5-11.6-11.9-3.6-1.5-3.5-2.3 1.2-13.5 2.8-6.7 3.8-7.9 25.1-28 35.1-33.2 70.6-68.9 95.4-96 33.1-36.2 39.2-42.3 43.9-44 5.1-1.8 5.9-1.8 9.8-.1" />
          </svg>
        </div>
      </div>
      <div class="border-r border-white">
        <div class="flex justify-center items-center h-full w-16 px-2">
          <img v-if="isGoodDay(content.health)" :src="check" alt="Good day" class="w-8 h-8" />
          <img v-else :src="cross" alt="Bad day" class="w-8 h-8" />
        </div>
      </div>
    </div>

    <div v-for="item in content.health" :key="item.time" class="border-t border-white">
      <div class="flex flex-row justify-between py-2 px-4">
        <p>
          {{ item.feeling }}
        </p>
        <p class="w-full mx-4 text-left">
          {{ item.dish }}
        </p>
        <p>
          {{ item.time }}
        </p>
      </div>
    </div>
  </div>
</template>
