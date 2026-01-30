"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks"; // Use typed hooks
import { fetchBooks, deleteBook } from "@/store/features/books/booksSlice";
// import Search from '@/app/ui/search';

import BookCard from "@/shared/components/bookCard";
import AddBookModal from "../modals/AddBooksModal";
import { Button, Input, Select, Space, Segmented, Table, Tag } from "antd";
import type { Book } from "@/store/features/books/booksSlice";
import { AppstoreOutlined, UnorderedListOutlined } from "@ant-design/icons";

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
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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
      dispatch(fetchBooks());
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
    <main className="px-3 sm:px-4 md:px-6 lg:px-8 pb-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl pt-2 pb-1">All Books</h1>
      <div>
        <p className="text-sm sm:text-base text-foreground/90 pb-4">List of books that you own!</p>
      </div>

      <div className="filters mb-4 sm:mb-6 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        <Space wrap size="small" className="w-full sm:w-auto [&_.ant-input]:w-full [&_.ant-input]:min-w-0 sm:[&_.ant-input]:min-w-[140px] md:[&_.ant-input]:min-w-[180px] [&_.ant-select]:w-full [&_.ant-select]:min-w-0 sm:[&_.ant-select]:min-w-[140px] md:[&_.ant-select]:min-w-[180px]">
          <Input
            placeholder="Filter by title"
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
            allowClear
            className="w-full sm:!w-auto min-w-0"
          />
          <Select
            placeholder="Filter by author"
            value={authorFilter}
            onChange={setAuthorFilter}
            allowClear
            className="w-full sm:!w-auto min-w-0"
            style={{ minWidth: "clamp(0px, 100%, 180px)" }}
            options={uniqueAuthors.map((a) => ({ value: a, label: a }))}
          />
          <Select
            placeholder="Filter by status"
            value={statusFilter}
            onChange={setStatusFilter}
            allowClear
            className="w-full sm:!w-auto min-w-0"
            style={{ minWidth: "clamp(0px, 100%, 180px)" }}
            options={READING_STATUS_OPTIONS}
          />
          <Segmented
            value={viewMode}
            onChange={(v) => setViewMode(v as "grid" | "list")}
            options={[
              { value: "grid", label: "Grid", icon: <AppstoreOutlined /> },
              { value: "list", label: "List", icon: <UnorderedListOutlined /> },
            ]}
            className="w-full sm:w-auto"
          />
        </Space>
        <Button type="primary" onClick={handleOpenAddModal} className="w-full sm:w-auto shrink-0 sm:mr-6 order-first sm:order-none">
          + Add Book
        </Button>
      </div>

      {loading ? (
        <p className="py-4">Loading...</p>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
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
      ) : (
        <div className="overflow-x-auto -mx-3 sm:-mx-4 md:mx-0 px-3 sm:px-4 md:px-0">
          <Table
            dataSource={filteredBooks}
            rowKey="_id"
            pagination={{
              pageSize: 20,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "50", "100"],
              size: "small",
            }}
            scroll={{ x: "max-content" }}
            size="small"
            columns={[
              {
                title: "Book title",
                dataIndex: "title",
                key: "title",
                sorter: (a, b) => a.title.localeCompare(b.title),
              },
              {
                title: "Author",
                dataIndex: "author",
                key: "author",
                sorter: (a, b) => a.author.localeCompare(b.author),
              },
              {
                title: "Reading status",
                dataIndex: "status",
                key: "status",
                render: (status: string) => {
                  const labels: Record<string, string> = {
                    "to-be-read": "To be read",
                    "currently-reading": "Currently reading",
                    "have-read": "Have read",
                  };
                  const colors: Record<string, string> = {
                    "to-be-read": "gold",
                    "currently-reading": "geekblue",
                    "have-read": "green",
                  };
                  return (
                    <Tag color={colors[status] || "default"}>
                      {labels[status] ?? status}
                    </Tag>
                  );
                },
              },
              {
                title: "Actions",
                key: "actions",
                render: (_, record) => (
                  <Space>
                    <Button type="link" size="small" onClick={() => handleEdit(record)}>
                      Edit
                    </Button>
                    <Button
                      type="link"
                      size="small"
                      danger
                      onClick={() => handleDelete(String(record._id))}
                    >
                      Delete
                    </Button>
                  </Space>
                ),
              },
            ]}
          />
        </div>
      )}

      <AddBookModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          type={modalType}
          bookId={selectedBook?._id ? String(selectedBook._id) : undefined}
          existingBooks={books}
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
    </main>
  );
}
