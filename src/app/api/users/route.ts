// // app/api/users/route.ts

// import { NextResponse } from 'next/server'
// import { db } from '@/lib/db'

// // handles GET /api/users
// export async function GET() {
//     const users = await db.users.findAll()
//     return NextResponse.json(users)
// }

// // handles POST /api/users
// export async function POST(request: Request) {
//     const body = await request.json()
//     const newUser = await db.users.create(body)
//     return NextResponse.json(newUser, { status: 201 })
// }