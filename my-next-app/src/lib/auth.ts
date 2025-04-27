import { supabase } from './supabaseClient'

// Funzione di registrazione utente
export const registerUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })

  if (error) {
    throw new Error(error.message)
  }

  return data?.user // Accedi a data.user invece di user
}

// Funzione di login utente
export const loginUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    throw new Error(error.message)
  }

  return data?.user // Accedi a data.user invece di user
}

// Funzione di logout utente
export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(error.message)
  }
}
