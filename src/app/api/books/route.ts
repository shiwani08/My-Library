import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET /api/books — get all books (public)
export async function GET() {
    const supabase = await createClient()

    const { data: books, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(books)
}

// POST /api/books — add a new book (authenticated only)
export async function POST(request: Request) {
    const supabase = await createClient()

    // Check if user is logged in
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, author, description, genre, cover_image, total_copies } = body

    if (!title || !author) {
        return NextResponse.json(
            { error: 'Title and author are required' },
            { status: 400 }
        )
    }

    const { data, error } = await supabase
        .from('books')
        .insert({
            title,
            author,
            description,
            genre,
            cover_image,
            total_copies: total_copies || 1,
            available_copies: total_copies || 1,
            created_by: user.id
        })
        .select()
        .single()

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
}