"use client";

import BookCard from "@/app/components/bookCard";
import React, { useEffect, useState } from "react";
import type { Book } from "@/types/books";

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("/data/books.json");
      const data = await response.json();
      setBooks(data);
    };

    fetchBooks();
  }, []);

  return (
    <main>
      <h1>All Books</h1>
      <p>List of books that you own!</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
            <BookCard
              key={book.title}
              title={book.title}
              author={book.author}
              status={book.status}
            />
          ))}
      </div>
    </main>
  );
}
