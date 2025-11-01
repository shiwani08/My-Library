'use client';

import BookCard from "@/app/components/bookCard";
import React, { useEffect, useState } from "react";
import type { Book } from "@/types/books";

export default function ToBeRead() {
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
      <h1>To Be Read</h1>
      <p>List of books you plan to read.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {books
                .filter((book) => book.status === "to-be-read")
                .map((book, index) => (
                  <div
                    key={book._id || index}
                    role="button"
                    tabIndex={0}
                    title={book.title}
                    aria-label={`Open details for ${book.title}`}
                    onClick={() => console.log("Book ID:", book._id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        console.log("Book ID:", book._id);
                      }
                    }}
                  >
                    <BookCard
                      title={book.title}
                      author={book.author}
                      status={book.status}
                      image_url={book.image_url ?? ""}
                    />
                  </div>
                ))}
            </div>
    </main>
  );
}
