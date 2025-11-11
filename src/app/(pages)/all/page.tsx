"use client";

import BookCard from "@/app/components/bookCard";
import React, { useEffect, useState } from "react";
import type { Book } from "@/types/books";
import { Button } from "antd";
import AddBookModal from "../modals/AddBooksModal";

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddBook = (newBook: any) => {
    console.log("New Book Added:", newBook);
    // You can later push it to state or send to backend
  };

  useEffect(() => {
    4;
    const fetchBooks = async () => {
      const response = await fetch("http://localhost:5000/get-books");
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
        {books.map((book, index) => (
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
      <div className="add-books">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          + Add Book
        </Button>

        <AddBookModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddBook={handleAddBook}
        />
      </div>
    </main>
  );
}
