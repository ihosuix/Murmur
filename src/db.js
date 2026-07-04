import { db } from './firebase.js'
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  setDoc,
  getDoc,
  where,
  getDocs
} from 'firebase/firestore'

export async function sendMessage(chatId, userId, text) {
  await addDoc(collection(db, 'chats', chatId, 'messages'), {
    text,
    senderId: userId,
    createdAt: serverTimestamp()
  })

  await setDoc(doc(db, 'chats', chatId), {
    lastMessage: text,
    lastMessageAt: serverTimestamp()
  }, { merge: true })
}

export function listenMessages(chatId, callback) {
  const q = query(
    collection(db, 'chats', chatId, 'messages'),
    orderBy('createdAt', 'asc')
  )
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  }, (e) => {
    console.error('listenMessages error:', e)
  })
}

export async function getOrCreateChat(userId1, userId2) {
  const chatId = [userId1, userId2].sort().join('_')
  const chatRef = doc(db, 'chats', chatId)
  const chatSnap = await getDoc(chatRef)

  if (!chatSnap.exists()) {
    await setDoc(chatRef, {
      members: [userId1, userId2],
      createdAt: serverTimestamp(),
      lastMessageAt: serverTimestamp(),
      lastMessage: ''
    })
  }

  return chatId
}

export async function saveUserProfile(userId, name, email) {
  await setDoc(doc(db, 'users', userId), {
    name,
    email: (email || '').trim().toLowerCase(),
    createdAt: serverTimestamp()
  }, { merge: true })
}

export async function findUserByEmail(email) {
  const normalized = email.trim().toLowerCase()
  const q = query(collection(db, 'users'), where('email', '==', normalized))
  const snap = await getDocs(q)
  if (snap.empty) return null
  return { id: snap.docs[0].id, ...snap.docs[0].data() }
}

export function listenUserChats(userId, callback) {
  const q = query(
    collection(db, 'chats'),
    where('members', 'array-contains', userId)
  )
  return onSnapshot(q, async (snapshot) => {
    const chats = await Promise.all(snapshot.docs.map(async (d) => {
      const data = d.data()
      const otherUid = data.members.find(m => m !== userId)
      try {
        const userSnap = await getDoc(doc(db, 'users', otherUid))
        const otherUser = userSnap.exists()
          ? { uid: otherUid, ...userSnap.data() }
          : { uid: otherUid, name: 'Unknown' }
        return { id: d.id, ...data, otherUser }
      } catch(e) {
        return { id: d.id, ...data, otherUser: { uid: otherUid, name: 'Unknown' } }
      }
    }))
    callback(chats)
  }, (e) => {
    console.error('listenUserChats error:', e)
  })
}

export async function getMessages(chatId) {
  const q = query(
    collection(db, 'chats', chatId, 'messages'),
    orderBy('createdAt', 'asc')
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}