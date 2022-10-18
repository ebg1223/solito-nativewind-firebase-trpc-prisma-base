import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

export async function checkToken(token: string) {
  if (getApps().length === 0) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    })
  }
  const auth = getAuth()
  return await auth.verifyIdToken(token)
}
