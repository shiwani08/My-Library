import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBooks, deleteBook } from "@/store/features/books/booksSlice";
import type { Book } from "@/store/features/books/booksSlice";

export function useBooks() {
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.books.list);
  const loading = useAppSelector((state) => state.books.loading);

  const [titleFilter, setTitleFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const uniqueAuthors = useMemo(
    () => [...new Set(books.map((b) => b.author).filter(Boolean))].sort(),
    [books]
  );

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesTitle = !titleFilter || book.title.toLowerCase().includes(titleFilter.toLowerCase());
      const matchesAuthor = !authorFilter || book.author === authorFilter;
      const matchesStatus = !statusFilter || book.status === statusFilter;
      return matchesTitle && matchesAuthor && matchesStatus;
    });
  }, [books, titleFilter, authorFilter, statusFilter]);

  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredBooks.slice(startIndex, startIndex + pageSize);
  }, [filteredBooks, currentPage, pageSize]);

  // Reset to page 1 when filters change
  useEffect(() => { setCurrentPage(1); }, [titleFilter, authorFilter, statusFilter]);

  useEffect(() => { dispatch(fetchBooks()); }, [dispatch]);

  const handleDelete = async (bookId: string) => {
    try {
      await dispatch(deleteBook(bookId)).unwrap();
      dispatch(fetchBooks());
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return {
    books,
    loading,
    filteredBooks,
    paginatedBooks,
    uniqueAuthors,
    titleFilter, setTitleFilter,
    authorFilter, setAuthorFilter,
    statusFilter, setStatusFilter,
    currentPage, setCurrentPage,
    pageSize, setPageSize,
    handleDelete,
  };
}