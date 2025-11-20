"use client";

import { useBookOperations } from "@/shared/customHooks/bookOperations.tsx/crudBooks";
import BookCard from "@/shared/components/bookCard";
import React, { useEffect, useState } from "react";
import type { Book } from "@/shared/types/books";
import { Button } from "antd";
import AddBookModal from "../modals/AddBooksModal";

export default function HomePage() {
  const { books, loading, fetchBooks, deleteBook } = useBookOperations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit">("add");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setModalType("edit");
    setIsModalOpen(true);
  };

  const handleDelete = async (bookId: string) => {
    await deleteBook(bookId);
  };

  const handleOpenAddModal = () => {
    setModalType("add");
    setSelectedBook(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <main>
      <h1>All Books</h1>
      <div>
        <p>List of books that you own!</p>
      </div>

      {loading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard
              key={book._id}
              _id={String(book._id)}
              title={book.title}
              author={book.author}
              status={book.status}
              image_url={book.image_url ?? ""}
              onEdit={() => handleEdit(book)}
              onDelete={() => handleDelete(String(book._id))}
            />
          ))}
        </div>
      )}

      <div className="add-books">
        <Button type="primary" onClick={handleOpenAddModal}>
          + Add Book
        </Button>

        <AddBookModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
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
