import { useState } from "react";
import { message } from "antd";
import type { Book } from "@/shared/types/books";

export const useBookOperations = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all books
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/get-books");
      const data = await response.json();
      setBooks(data);
      return data;
    } catch (error) {
      console.error("Error fetching books:", error);
      message.error("Failed to fetch books");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Add a new book
  const addBook = async (bookData: {
    title: string;
    author: string;
    status: string;
    image_url: string;
  }) => {
    try {
      const res = await fetch("http://localhost:5000/add-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add book");
      }

      const data = await res.json();
      message.success("Book added successfully!");
      await fetchBooks(); 
      return data;
    } catch (error) {
      console.error("Error adding book:", error);
      message.error("Failed to add book");
      throw error;
    }
  };

  // Update a book
  const updateBook = async (
    bookId: string,
    bookData: {
      title: string;
      author: string;
      status: string;
      image_url: string;
    }
  ) => {
    try {
      const res = await fetch(`http://localhost:5000/update-book/${bookId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update book");
      }

      const data = await res.json();
      message.success("Book updated successfully!");
      await fetchBooks(); 
      return data;
    } catch (error) {
      console.error("Error updating book:", error);
      message.error("Failed to update book");
      throw error;
    }
  };

  // Delete a book
  const deleteBook = async (bookId: string) => {
    try {
      const res = await fetch(`http://localhost:5000/delete-book/${bookId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete book");
      }

      message.success("Book deleted successfully!");
      await fetchBooks(); 
      return true;
    } catch (error) {
      console.error("Error deleting book:", error);
      message.error("Failed to delete book");
      throw error;
    }
  };

  return {
    books,
    loading,
    fetchBooks,
    addBook,
    updateBook,
    deleteBook,
  };
};