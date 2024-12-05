<script setup>
import Modal from './Modal.vue'
import { supabase } from '@/utils/supabase'

import { ref, toRefs, watch } from 'vue';

const props = defineProps({
  session: Object,
})
const { session } = toRefs(props)

const email = ref('')
const password = ref('')

const user = ref({
  name: 'Guest',
  image: 'https://picsum.photos/60',
})

const confirmLogin = ref(false)

const handleLogin = async () => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if (error) throw error

    confirmLogin.value = false
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  }
}

const handleLogout = async () => {
  await supabase.auth.signOut()
  await refreshUser()
}

const closeLoginModal = () => {
  email.value = ''
  password.value = ''
  confirmLogin.value = false
}

const refreshUser = async () => {
  if (session.value?.user) {
    const { data: loggedUser } = await supabase
      .from('users')
      .select('name, image')
      .eq('id_user', session.value.user.id)
      .single()

    user.value = loggedUser
  } else {
    user.value = {
      name: 'Guest',
      image: 'https://picsum.photos/60',
    }
  }
}

watch(session, async (newSession) => {
  if (newSession && newSession.user) {
    await refreshUser()
  }
}, { immediate: true })
</script>

<template>
  <header class="sticky z-10 top-0 w-full bg-gray-950 text-white p-4">
    <div class="flex justify-between items-center w-2/3 mx-auto">
      <div class="flex items-center gap-4">
        <img v-if="user.image" :src="user.image" alt="User avatar" class="h-8 w-8 rounded-full">
        <span v-else class="h-8 w-8 flex items-center justify-center rounded-full bg-gray-800">{{ user.name.slice(0, 2) }}</span>

        <span>{{ user.name }}</span>
      </div>

      <button @click="session?.user ? handleLogout() : confirmLogin = true" class="bg-cyan-500 hover:bg-cyan-700 text-white p-2 rounded-lg">
        {{ session?.user ? 'Logout' : 'Login' }}
      </button>
    </div>
  </header>

  <Modal :show="confirmLogin" @close="closeLoginModal">
    <div class="my-16 sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="text-lg font-medium text-white mb-6">
        Sign in to your account
      </h2>

      <form @submit.prevent="handleLogin" class="space-y-6" action="#" method="POST">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-slate-200">
            Email address
          </label>
          <div class="mt-2">
            <input v-model="email" type="email" name="email" id="email" autocomplete="email" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-500 sm:text-sm/6">
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-slate-200">
              Password
            </label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-cyan-500 hover:text-cyan-600">
                Forgot password?
              </a>
            </div>
          </div>
          <div class="mt-2">
            <input v-model="password" type="password" name="password" id="password" autocomplete="current-password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-500 sm:text-sm/6">
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-cyan-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500">Sign in</button>
        </div>
      </form>
    </div>
  </Modal>
</template>
