'use client'

import { SessionProvider } from 'next-auth/react'

// Define the props for the AuthContext component
interface AuthContextProps {
  children: React.ReactNode // Props for the children components
}

// Define the AuthContext component
export default function AuthContext({ children }: AuthContextProps) {
  // Wrap the children components with SessionProvider
  return <SessionProvider>{children}</SessionProvider>
}
