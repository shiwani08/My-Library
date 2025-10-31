"use client";

import BookCard from "@/app/components/bookCard";
import React, { useEffect, useState } from "react";
import type { Book } from "@/types/books";

export default function CurrentlyReading() {
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
      <h1>Currently Reading</h1>
      <p>List of books you're currently reading.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books
          .filter((book) => book.status === "currently-reading")
          .map((book) => (
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
