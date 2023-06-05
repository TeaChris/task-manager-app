import bcrypt from 'bcrypt'
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, password } = body

    // Check if the required fields are present in the request body
    if (!email || !name || !password) {
      return new NextResponse('Missing information', { status: 400 })
    }

    // Hash the password using bcrypt with a cost factor of 12
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create a new user in the database using Prisma
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    })

    // Return the created user as a JSON response
    return NextResponse.json(user)
  } catch (error: any) {
    console.error(error, 'REGISTRATION_ERROR')

    // Return an internal server error response in case of any unexpected errors
    return new NextResponse('Internal server error', { status: 500 })
  }
}
