'use client'

import { signOut } from 'next-auth/react'

export default function Home() {
  const handleLogout = async () => {
    const signOutResult: any = await signOut()

    if (signOutResult && signOutResult.error) {
      // Handle the error.
    } else {
      // Redirect the user to the sign-in page.
      window.location.href = '/'
    }
  }

  return <button onClick={handleLogout}>Logout</button>
}
