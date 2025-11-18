"use client";

import BookCard from "@/app/components/bookCard";
import React, { useEffect, useState } from "react";
import type { Book } from "@/types/books";
import { Button, message } from "antd";
import AddBookModal from "../modals/AddBooksModal";

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit">("add");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Fetch books function
  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:5000/get-books");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
      message.error("Failed to fetch books");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Single handler for both add and update
  const handleBookAction = (book: any) => {
    if (modalType === "add") {
      console.log("New Book Added:", book);
      message.success("Book added successfully!");
    } else {
      console.log("Book Updated:", book);
      message.success("Book updated successfully!");
    }
    setIsModalOpen(false);
    fetchBooks(); // Refresh the book list
  };

  // Handle Edit Book
  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setModalType("edit");
    setIsModalOpen(true);
  };

  // Handle Delete Book
  const handleDelete = async (bookId: string) => {
    try {
      const res = await fetch(`http://localhost:5000/delete-book/${bookId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete book");
      }

      message.success("Book deleted successfully!");
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
      message.error("Failed to delete book");
    }
  };

  // Handle opening Add Book modal
  const handleOpenAddModal = () => {
    setModalType("add");
    setSelectedBook(null);
    setIsModalOpen(true);
  };

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
              _id={String(book._id)}
              title={book.title}
              author={book.author}
              status={book.status}
              image_url={book.image_url ?? ""}
              onEdit={() => handleEdit(book)}
              onDelete={() => handleDelete(String(book._id))}
            />
          </div>
        ))}
      </div>
      <div className="add-books">
        <Button type="primary" onClick={handleOpenAddModal}>
          + Add Book
        </Button>

        <AddBookModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddBook={handleBookAction}
          type={modalType}
          bookId={selectedBook?._id ? String(selectedBook._id) : undefined}
          initialValues={
            selectedBook
              ? {
                  title: selectedBook.title,
                  author: selectedBook.author,
                  status: selectedBook.status,
                  image_url: selectedBook.image_url ?? "",
                }
              : undefined
          }
        />
      </div>
    </main>
  );
}
