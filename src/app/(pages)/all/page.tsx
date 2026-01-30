"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks"; // Use typed hooks
import { fetchBooks, deleteBook } from "@/store/features/books/booksSlice";
// import Search from '@/app/ui/search';

import BookCard from "@/shared/components/bookCard";
import AddBookModal from "../modals/AddBooksModal";
import { Button, Input, Select, Space } from "antd";
import type { Book } from "@/store/features/books/booksSlice";

const READING_STATUS_OPTIONS = [
  { value: "to-be-read", label: "To be read" },
  { value: "currently-reading", label: "Currently reading" },
  { value: "have-read", label: "Have read" },
];

export default function HomePage() {
  const dispatch = useAppDispatch();

  const books = useAppSelector((state) => state.books.list);
  const loading = useAppSelector((state) => state.books.loading);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit">("add");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const [titleFilter, setTitleFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const uniqueAuthors = useMemo(
    () => [...new Set(books.map((b) => b.author).filter(Boolean))].sort(),
    [books]
  );

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesTitle =
        !titleFilter ||
        book.title.toLowerCase().includes(titleFilter.toLowerCase());
      const matchesAuthor =
        !authorFilter || book.author === authorFilter;
      const matchesStatus =
        !statusFilter || book.status === statusFilter;
      return matchesTitle && matchesAuthor && matchesStatus;
    });
  }, [books, titleFilter, authorFilter, statusFilter]);

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
      <h1 className="pl-6 md:pl-8">All Books</h1>
      <div>
        <p className="pl-6 md:pl-8" >List of books that you own!</p>
      </div>

      <div className="filters mb-6 flex flex-wrap items-center gap-4 pl-6 md:pl-8">
        <Space wrap size="middle">
          <Input
            placeholder="Filter by title"
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
            allowClear
            style={{ minWidth: 180 }}
          />
          <Select
            placeholder="Filter by author"
            value={authorFilter}
            onChange={setAuthorFilter}
            allowClear
            style={{ minWidth: 180 }}
            options={uniqueAuthors.map((a) => ({ value: a, label: a }))}
          />
          <Select
            placeholder="Filter by reading status"
            value={statusFilter}
            onChange={setStatusFilter}
            allowClear
            style={{ minWidth: 180 }}
            options={READING_STATUS_OPTIONS}
          />
        </Space>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
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
