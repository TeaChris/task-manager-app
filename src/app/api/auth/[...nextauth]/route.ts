import bcrypt from 'bcrypt'
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import prisma from '@/app/libs/prismadb'

// Configure authentication options
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma), // Use Prisma as the data adapter for authentication
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }), // Configure GitHub as an authentication provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }), // Configure Google as an authentication provider
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        // Custom credentials-based authorization logic
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        // Check if the user exists and compare the hashed password
        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials')
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials')
        }

        return user
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development', // Enable debug mode in development environment
  session: {
    strategy: 'jwt', // Set the session strategy to use JSON Web Tokens
  },
  secret: process.env.NEXTAUTH_SECRET, // Set the secret for signing cookies and tokens
}

const handler = NextAuth(authOptions)

// Export the authentication handler for GET and POST requests
export { handler as GET, handler as POST }
