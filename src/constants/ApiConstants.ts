export const API_BASE = 'http://localhost:5000'

export const API_ROUTES = {
    "books": "/api/books",
    "book": (id: string) => `/api/books/${id}`
}
