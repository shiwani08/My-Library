my-library/
│
├── frontend/                     # Next.js frontend app
│   ├── src/
│   │   ├── app/                  # Next.js 13+ App Router pages
│   │   │   ├── layout.tsx        # Common layout (Navbar, Footer, etc.)
│   │   │   ├── page.tsx          # Default page (All books)
│   │   │   ├── currently-reading/
│   │   │   │   └── page.tsx
│   │   │   ├── have-read/
│   │   │   │   └── page.tsx
│   │   │   ├── want-to-read/
│   │   │   │   └── page.tsx
│   │   │   ├── add-book/
│   │   │   │   └── page.tsx
│   │   │   └── edit-book/
│   │   │       └── [id]/page.tsx  # Dynamic route for editing a specific book
│   │   │
│   │   ├── components/           # Reusable UI components
│   │   │   ├── BookCard.tsx
│   │   │   ├── BookForm.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── lib/                  # Helpers / utils / dummy data
│   │   │   ├── constants.ts
│   │   │   └── dummyBooks.ts
│   │   │
│   │   ├── styles/               # Global & Tailwind styles
│   │   │   ├── globals.css
│   │   │   └── custom.css
│   │   │
│   │   ├── types/                # TypeScript interfaces (optional but recommended)
│   │   │   └── book.d.ts
│   │   │
│   │   └── services/             # For future API calls (in Phase 2)
│   │       └── bookService.ts
│   │
│   ├── public/                   # Static assets (icons, default book image, etc.)
│   │   ├── images/
│   │   │   └── default-book.png
│   │   └── favicon.ico
│   │
│   ├── package.json
│   └── tailwind.config.js
│
└── backend/                      # Flask backend (Phase 2)
    ├── app.py
    ├── controllers/
    ├── models/
    ├── routes/
    ├── static/
    └── templates/
