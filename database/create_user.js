import { supabase } from '@/utils/supabase'

// const { data, error } = await supabase.auth.signInWithPassword({
const { data, error } = await supabase.auth.signUp({
  // NOTE : To be active, the email must be verified
  email: 'example@example.com',
  password: 'example123',
})
console.log(data, error)

// const { data: userExist, error: userExistError } = await supabase
//   .from('users')
//   .select()
//   .eq('id_user', data.user.id)
// console.log(userExist, userExistError)

// if (data.length === 0) {
const { data: user, error: userError } = await supabase
  .from('users')
  .upsert({
    id_user: data.user.id,
    name: 'Example user',
    created_at: new Date(),
  }, {
    onConflict: 'id_user',
  })
  .select()
console.log(user, userError)
// }
