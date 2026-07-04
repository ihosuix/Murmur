import { auth } from './firebase.js'
import { saveUserProfile } from './db.js'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'

async function syncProfile(user) {
  for (let i = 0; i < 5; i++) {
    try {
      await saveUserProfile(user.uid, user.displayName || '', user.email)
      console.log('profile synced:', user.email)
      return
    } catch(e) {
      console.log(`sync retry ${i + 1}...`, e)
      if (i < 4) await new Promise(r => setTimeout(r, 2000))
    }
  }
  throw new Error('Could not save profile. Please check your connection and try again.')
}

export async function signUp(name, email, password) {
  const result = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(result.user, { displayName: name })
  await syncProfile(result.user)
  return result.user
}

export async function signIn(email, password) {
  const result = await signInWithEmailAndPassword(auth, email, password)
  syncProfile(result.user).catch(e => console.error('profile sync failed:', e))
  return result.user
}

export async function logOut() {
  await signOut(auth)
}

export function onAuthChange(callback) {
  return onAuthStateChanged(auth, (user) => {
    callback(user)
  })
}