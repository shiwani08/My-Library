"use client";

import { useState } from "react";
import { useBooks } from "../../../shared/hooks/useBooks";
// import BookFilters from "../../../shared/components/BookFilter";
// import BookGrid from "@/components/BookGrid";
// import BookTable from "@/components/BookTable";
import AddBookModal from "../modals/AddBooksModal";
import type { Book } from "@/store/features/books/booksSlice";

export default function HomePage() {
  const {
    loading, filteredBooks, paginatedBooks, uniqueAuthors,
    titleFilter, setTitleFilter,
    authorFilter, setAuthorFilter,
    statusFilter, setStatusFilter,
    currentPage, setCurrentPage,
    pageSize, setPageSize,
    handleDelete,
  } = useBooks();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit">("add");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setModalType("edit");
    setIsModalOpen(true);
  };

  const handleOpenAddModal = () => {
    setModalType("add");
    setSelectedBook(null);
    setIsModalOpen(true);
  };

  return (
    <main className="px-3 sm:px-4 md:px-6 lg:px-8 pb-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl pt-2 pb-1">All Books</h1>
      <p className="text-sm sm:text-base text-foreground/90 pb-4">
        List of books that you own!
      </p>

      <BookFilters
        uniqueAuthors={uniqueAuthors}
        titleFilter={titleFilter}
        authorFilter={authorFilter}
        statusFilter={statusFilter}
        viewMode={viewMode}
        onTitleChange={setTitleFilter}
        onAuthorChange={setAuthorFilter}
        onStatusChange={setStatusFilter}
        onViewModeChange={setViewMode}
        onAddBook={handleOpenAddModal}
      />

      {loading ? (
        <p className="py-4">Loading...</p>
      ) : viewMode === "grid" ? (
        <BookGrid
          books={paginatedBooks}
          total={filteredBooks.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onPageChange={(page, size) => { setCurrentPage(page); setPageSize(size); }}
        />
      ) : (
        <BookTable
          books={filteredBooks}
          currentPage={currentPage}
          pageSize={pageSize}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onPageChange={(page, size) => { setCurrentPage(page); setPageSize(size); }}
        />
      )}

      <AddBookModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setSelectedBook(null); }}
        type={modalType}
        bookId={selectedBook?._id ? String(selectedBook._id) : undefined}
        existingBooks={[]}
        initialValues={selectedBook ? {
          title: selectedBook.title,
          author: selectedBook.author,
          status: selectedBook.status,
          image_url: selectedBook.image_url ?? "",
        } : undefined}
      />
    </main>
  );
}