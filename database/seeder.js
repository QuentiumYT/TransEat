import { FEELING, TIME } from '@/utils/constants'
import { supabase } from '@/utils/supabase'

const daysContent = [{
  id: Math.random().toString(10).substring(2, 15),
  date: new Date(new Date().setDate(new Date().getDate() - 10)),
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
  date: new Date(),
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
  date: new Date(),
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
  date: new Date(),
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

// retrieve a random user
const { data: tableCount } = await supabase
  .from('users')
  .select('id', { count: 'exact' })

const randomIndex = Math.floor(Math.random() * tableCount.length)

const { data: randomUser } = await supabase
  .from('users')
  .select('id')
  .range(randomIndex, randomIndex)

const userId = randomUser[0].id

daysContent.forEach(async (day) => {
  const { data, error } = await supabase
    .from('days')
    .insert({
      id_user: userId,
      date: day.date,
      note: day.note,
    })
    .select()
  if (error) console.error('error', error)

  const dayId = data[0].id

  day.health.forEach(async (health) => {
    const { data, error } = await supabase
      .from('health')
      .insert({
        id_day: dayId,
        dish: health.dish,
        time: health.time,
        feeling: health.feeling,
      })
      .select()
    if (error) console.error('error', error)
  })
})
