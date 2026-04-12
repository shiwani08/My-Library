import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const { email, password, full_name } = await request.json()

    if (!email || !password) {
        return NextResponse.json(
            { error: 'Email and password are required' },
            { status: 400 }
        )
    }

    const supabase = await createClient()

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { full_name }  // stored in user metadata
        }
    })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(
        { message: 'Registration successful. Check your email to confirm.' },
        { status: 201 }
    )
}