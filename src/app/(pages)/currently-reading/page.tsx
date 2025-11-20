"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks"; // Use typed hooks
import { fetchBooks, deleteBook } from "@/store/features/books/booksSlice";

import BookCard from "@/shared/components/bookCard";
import AddBookModal from "../modals/AddBooksModal";
import { Button } from "antd";
import type { Book } from "@/store/features/books/booksSlice";

export default function HomePage() {
  const dispatch = useAppDispatch();

  const books = useAppSelector((state) => state.books.list);
  const loading = useAppSelector((state) => state.books.loading);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit">("add");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setModalType("edit");
    setIsModalOpen(true);
  };

  const handleDelete = async (bookId: string) => {
    try {
      await dispatch(deleteBook(bookId)).unwrap();
    } catch (error) {
      console.error("Delete failed:", error);
    }
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
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.filter((book) => book.status === "currently-reading").map((book) => (
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
